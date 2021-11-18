// mongoose
const mongoose = require("mongoose")

// schema
const {Schema, model} = mongoose

// creation schema
const UserSchema = new Schema({
    name: { type: String, require: true},
    email: { type: String, require: true },
    password: { type: String, require: true},
    phone: Number
})

// export to the database model
module.exports = User = model("user", UserSchema)