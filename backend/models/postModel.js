const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        recipeId:{
            type: String, 
            required: true
        },
        title:{
            type: String, 
            required: true
        },
        instructions:{
            type: String, 
            required: true
        },
        image:{
            type: String, 
            required: true
        },
        category:{
            type: String, 
            required: true
        },
        area:{
            type: String, 
            required: true
        },
        ingredients:[
            {type: String}
        ],
        measurement:[
            {type: String}
        ],
        userId:{
            type: String, 
            required: true
        }
    },
    {timestamps: true}
);

//mongoDB collection name 
const Post = mongoose.model('posts', postSchema);

module.exports = Post;