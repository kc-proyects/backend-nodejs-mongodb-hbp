import Product from "../models/Product.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import createError from 'http-errors';


// GET /product/[id]
export async function product(req, res, next) {
    const productId = req.params.productId;

    if (mongoose.Types.ObjectId.isValid(productId)) { 
      const product = await Product.findOne({ _id: productId});

      if (!product) {
        return next(createError(404, 'Not found'));
      }
  
    
      res.locals.productName = product.name;
      res.locals.productDescription = product.description;
      res.locals.productPrice = product.price;
      res.locals.productOwner = await User.findOne( {_id: product.owner} );
      res.locals.productImage = product.image;
      res.locals.productTags = product.tags;
  
      res.render('product');
    }
    next();
}

// GET /product/create
export async function createProduct(req, res, next) {
  res.render('createproduct');
}

// GET /product/delete/:productId
export async function deleteProduct(req, res, next) {
  const userId = req.session.userId;
  const productId = req.params.productId;

  const product = await Product.findOne({ _id: productId })

  if (!product) {
    console.warn(`WARNING - el usuario ${userId} está intentando eliminar un producto inexistente`)
    return next(createError(404, 'Not found'))
  }

  if (product.owner.toString() !== userId) {
    console.warn(`WARNING - el usuario ${userId} está intentando eliminar un product de otro usuario`)
    return next(createError(401, 'Not authorized'))
  }

  await Product.deleteOne({ _id: productId })

  res.redirect('/')

}

// se llama al enviar form
export async function postCreateProduct(req, res, next) {
  try {
    const userId = req.session.userId; // TODO: validar user existente en BD.
    const { name, description, price, image, tags } = req.body;
  
    const product = new Product({
      name,
      description,
      owner: userId,
      price,
      image,
      tags
    })

    await product.save();

    res.redirect('/');
  } catch (err) {
    next(err);
  }
}