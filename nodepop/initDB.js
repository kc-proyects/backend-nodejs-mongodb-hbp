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
      owner: '672a49eeecb6529b6ff8a899', // user._id
      price: 34, 
      image: '/images/product/672a4c711912e9293ce9063b/subida.jpg', 
      tags: ['calculadora', 'operaciones', 'cálculo'] 
    },
    { 
      name: 'Secador de pelo vintage', 
      owner: '672a49eeecb6529b6ff8a899', 
      price: 20, 
      image: '/images/product/672a4c711912e9293ce9063b/subida.jpg', // product/{objectid}
      tags: ['productos de aseo', 'baño'] 
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