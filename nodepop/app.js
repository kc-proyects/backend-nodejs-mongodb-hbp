import express from 'express';
import * as homeController from './controllers/homeController.js';
import * as productController from './controllers/productController.js';
import connectMongoose from './lib/connectMongoose.js'

await connectMongoose();

const app = express();

app.locals.appName = 'nodepop';

app.set('views', 'views'); // Specify views folder.
app.set('view engine', 'ejs'); // Specify templates engine. 

app.use(express.static('public'));

app.get('/', homeController.home);
app.get('/product/:productId', productController.product);

export default app;