import express from 'express';
import * as homeController from './controllers/homeController.js';
import * as productController from './controllers/productController.js';
import * as loginController from './controllers/loginController.js';
import * as signupController from './controllers/signupController.js';
import connectMongoose from './lib/connectMongoose.js';
import * as sessionManager from './lib/sessionManager.js'

await connectMongoose();

const app = express();

app.locals.appName = 'nodepop';

app.set('views', 'views'); // Specify views folder.
app.set('view engine', 'ejs'); // Specify templates engine. 


app.use(sessionManager.middleware, sessionManager.useSessionInViews);

app.use(express.json()); // parsear el body que venga en formato JSON
app.use(express.urlencoded({ extended: false })); // parsear el body que venga urlencoded (formularios)
app.use(express.static('public'));

app.get('/', homeController.home);
app.get('/product/:productId', productController.product);
app.get('/login', loginController.login);
app.get('/logout', loginController.logout);
app.post('/login', loginController.postLogin);
app.get('/signup', signupController.signup);

// private pages
app.get('/product/create', sessionManager.isLoggedIn, productController.createProduct);
app.post('/product/create', sessionManager.isLoggedIn, productController.postCreateProduct);
app.get('/product/delete/:productId', sessionManager.isLoggedIn, productController.deleteProduct);

export default app;