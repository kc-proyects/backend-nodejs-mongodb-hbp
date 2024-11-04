import mongoose, { Schema } from 'mongoose'

// products schema
const productSchema = new Schema({
  name: { type: String, unique: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  price: { type: Number },
  image: { type: String }, // path? base64?
  tags: [{ type: String }]
}, {
  collection: 'product'
})

// product model
const Product = mongoose.model('Product', productSchema)

export default Product