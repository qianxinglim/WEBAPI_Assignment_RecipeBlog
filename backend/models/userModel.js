const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName:{
        type: String, 
        required: true
    },
    username:{
        type: String, 
        required: true
    },
    email:{
        type: String, 
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    date:{
        type: Date, 
        default: Date.now
    }
});

//mongoDB collection name 
const User = mongoose.model('users', userSchema);

module.exports = User;