import Product from "../models/Product.js";

// GET /
export async function home(req, res, next) {
    //res.send('<h2>Hola soy el middleware home</h2>');
    const products = await Product.find();

    res.locals.products = products;

    res.render('home');
};