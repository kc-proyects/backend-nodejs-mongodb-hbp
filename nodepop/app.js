import express from 'express';
import * as homeController from './controllers/homeController.js';
import * as productController from './controllers/productController.js';
import * as loginController from './controllers/loginController.js';
import * as signupController from './controllers/signupController.js';
import connectMongoose from './lib/connectMongoose.js'

await connectMongoose();

const app = express();

app.locals.appName = 'nodepop';

app.set('views', 'views'); // Specify views folder.
app.set('view engine', 'ejs'); // Specify templates engine. 

app.use(express.json()) // parsear el body que venga en formato JSON
app.use(express.urlencoded({ extended: false })) // parsear el body que venga urlencoded (formularios)
app.use(express.static('public'));

app.get('/', homeController.home);
app.get('/product/:productId', productController.product);
app.get('/login', loginController.login);
app.post('/login', loginController.postLogin)
app.get('/signup', signupController.signup);

export default app;