import readline from 'node:readline'
import connectMongoose from './lib/connectMongoose.js'
import Product from './models/Product.js'
import User from './models/User.js'

const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)

const questionResponse = await ask('Are you sure you want to empty the database and create initial data?')
if (questionResponse.toLowerCase() !== 'yes') {
  console.log('Operation aborted.')
  process.exit()
}

await initProducts();
//await initUsers();

connection.close()

async function initProducts() {
  // delete all products
  const deleteResult = await Product.deleteMany()
  console.log(`Deleted ${deleteResult.deletedCount} products.`)

  // create initial products
  const insertResult = await Product.insertMany([
    { 
      name: 'Calculadora Casio', 
      description: 'Descubre la funcionalidad y la durabilidad de esta calculadora Casio de segunda mano, un compañero ideal para estudiantes, profesionales y entusiastas de las matemáticas. Con su diseño compacto y robusto, esta calculadora es perfecta para llevar a clase o utilizar en la oficina.', 
      owner: '672a49eeecb6529b6ff8a899', // user._id
      price: 34, 
      image: '/images/product/casio/casio.jpg', 
      tags: ['calculadora', 'operaciones', 'cálculo'] 
    },
    { 
      name: 'Secador de pelo vintage',
      description: 'Revive la nostalgia con este encantador secador de pelo vintage de segunda mano, que combina un diseño clásico con un rendimiento excepcional. Este artículo, con su elegante acabado en metal y detalles retro, evoca la estética de épocas pasadas, convirtiéndolo en una pieza única para los amantes del estilo vintage.', 
      owner: '672a49eeecb6529b6ff8a899', 
      price: 20, 
      image: '/images/product/672a4c711912e9293ce9063b/subida.jpg', // product/{objectid}
      tags: ['productos de aseo', 'baño', 'vintage'] 
    },
    { 
      name: 'Máquina de escribir',
      description: 'Revive la elegancia y la nostalgia de tiempos pasados con esta máquina de escribir antigua, un verdadero ícono de la era de la escritura manual. Con su robusta estructura de metal y su acabado clásico', 
      owner: '672a49eeecb6529b6ff8a899', 
      price: 102.23, 
      image: '/images/product/maquina-de-escribir/maquina.jpg',
      tags: ['vintage', 'escritura'] 
    }
  ])
  console.log(`Created ${insertResult.length} products.`)
}

async function initUsers() {
  const deleteResult = await User.deleteMany()
  console.log(`Deleted ${deleteResult.deletedCount} users.`)

  const insertResult = await User.insertMany([
    { 
      username: 'admin', 
      emai: 'admin@nodepop.com', password: 'admin', profileImage: './public/images/userpic', roles: ['admin'] 
    },
    { 
      username: 'hector', 
      emai: 'hector@gmail.com', password: 'hector', profileImage: './public/images/userpic', roles: ['user'] 
    }
  ])
  console.log(`Created ${insertResult.length} users.`)
}

function ask(questionText) {
  return new Promise((resolve, reject) => {
    const consoleInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    consoleInterface.question(questionText, answer => {
      consoleInterface.close()
      resolve(answer)
    })
  })
}