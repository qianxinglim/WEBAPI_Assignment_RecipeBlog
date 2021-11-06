const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
//const dotenv = require('dotenv');
//dotenv.config()

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const userRouteUrls = require('./routes/userRoutes');
const authRouteUrls = require('./routes/authRoutes');
const postRouteUrls = require('./routes/postRoutes');
const catRouteUrls = require('./routes/categoryRoutes');

//base path. if user is in signin page, the url is gonna look like www.recipeblog.com/app/signin
app.use('/user', userRouteUrls);
app.use('/auth', authRouteUrls);
app.use('/post', postRouteUrls);
app.use('/category', catRouteUrls);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});