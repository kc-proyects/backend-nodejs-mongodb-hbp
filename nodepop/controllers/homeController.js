import Product from "../models/Product.js";
import User from "../models/User.js";

// GET /
export async function home(req, res, next) {
    
    if (req.session.userId) {
        const currentUserId = req.session.userId;
        const currentUser = await User.findOne({_id: currentUserId});
        let products = [];

        if (currentUser.roles.includes('admin')) {
            products = await Product.find();
        } else {
            products = await Product.find({ owner: currentUserId});
        }

        res.locals.products = products;
    }

    res.render('home');
};