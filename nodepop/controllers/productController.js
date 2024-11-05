import Product from "../models/Product.js";


// GET /product/[id]
export async function product(req, res, next) {
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId});

    if (!product) {
      return next(createError(404, 'Not found'));
    }

  
    res.locals.productName = product.name;
    res.locals.productPrice = product.price;
    res.locals.productOwner = product.owner;
    res.locals.productImage = product.image;
    res.locals.productTags = product.tags;

    res.render('product');
};