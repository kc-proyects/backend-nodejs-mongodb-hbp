

// GET /product
export function product(req, res, next) {
    
    res.locals.productName = "Samsung 12";

    res.render('product');
};