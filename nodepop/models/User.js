import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    profileImage: String,
    roles: [{ type: String }]
}, {
    collection: 'user'
})

// User.find --> static
// user.save --> instance

// static method. Creates passwd hash.
userSchema.statics.hashPassword = function (clearPassword) {
    return bcrypt.hash(clearPassword, 7)
}

// instance method. Chack if password matches.
userSchema.methods.comparePassword = function (clearPassword) {
    return bcrypt.compare(clearPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User