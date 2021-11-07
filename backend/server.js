const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(express.static(path.join(__dirname, 'client/build')));

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

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === 'staging') {
    // Express will serve up production assets i.e. main.js
    const path = require('path');
    const publicPath = path.join(__dirname, '/build');
    app.use(express.static(publicPath));
    // If Express doesn't recognize route serve index.html
    //const path = require('path');
    app.get('*', (req, res) => {
       res.sendFile(
           path.join(publicPath, 'index.html')
       );
    });
}

// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
//   });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});