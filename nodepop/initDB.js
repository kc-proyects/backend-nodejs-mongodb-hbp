import readline from 'node:readline'
import connectMongoose from './lib/connectMongoose.js'
import Product from './models/Prodct.js'

const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)

const questionResponse = await ask('Are you sure you want to empty the database and create initial data?')
if (questionResponse.toLowerCase() !== 'yes') {
  console.log('Operation aborted.')
  process.exit()
}

await initProducts()

connection.close()

async function initProducts() {
  // delete all products
  const deleteResult = await Product.deleteMany()
  console.log(`Deleted ${deleteResult.deletedCount} products.`)

  // create initial products
  const insertResult = await Agent.insertMany([
    { name: 'Smith', age: 31, owner: admin._id },
    { name: 'Brown', age: 42, owner: admin._id },
    { name: 'Jones', age: 23, owner: user1._id }
  ])
  console.log(`Created ${insertResult.length} agents.`)
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