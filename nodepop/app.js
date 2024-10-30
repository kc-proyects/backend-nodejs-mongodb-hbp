import express from 'express';
import * as homeController from './controllers/homeController.js';

const app = express();

app.locals.appName = 'NodePop';

app.set('views', 'views'); // Specify views folder.
app.set('view engine', 'ejs'); // Specify templates engine. 

app.use(express.static('public'));

app.get('/', homeController.home);

export default app;