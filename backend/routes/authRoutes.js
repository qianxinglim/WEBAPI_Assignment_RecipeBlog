// const router = require('express').Router();
// let User = require('../models/userModel');
// const bcrypt = require('bcrypt');
// const generateToken = require('../utils/generateToken');

// router.post('/signup', async (req, res) => {

//     try{
//         let{fullName, username, email, password} = req.body;

//         username = username.trim();
//         email = email.trim();
//         password = password.trim();

//         if(fullName=="" || username=="" || email=="" || password==""){
//             res.json({
//                 status: "FAILED",
//                 message: "Empty input fields!"
//             });
//         }
//         else if(!/^[a-zA-Z ]*$/.test(fullName)){
//             res.json({
//                 status: "FAILED",
//                 message: "Invalid name entered"
//             });
//         }
//         else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)){
//             res.json({
//                 status: "FAILED",
//                 message: "Invalid email"
//             });
//         }
//         else if(password.length < 6){
//             res.json({
//                 status: "FAILED",
//                 message: "Password is too short!"
//             });
//         }
//         else{
//             User.find({username}).then(result => {
//                 if(result.length){
//                     //User already exists
//                     res.json({
//                         status: "FAILED",
//                         message: "username already exists!"
//                     });
//                 }
//                 else{
//                     // const saltPassword = await bcrypt.genSalt(10);
//                     // const securePassword = await bcrypt.hash(req.body.password, saltPassword);

//                     // const signedUpUser = new User({
//                     //     fullName: req.body.fullName,
//                     //     username: req.body.username,
//                     //     email: req.body.email,
//                     //     password: securePassword
//                     // });
    
//                     // signedUpUser.save()
//                     //     .then(data => res.json(data))
//                     //     .catch(err => res.json(err));

//                     const saltRounds = 10;
//                     bcrypt.hash(password, saltRounds).then(hashedPassword => {
//                         const signedUpUser = new User({
//                             fullName: req.body.fullName,
//                             username: req.body.username,
//                             email: req.body.email,
//                             password: hashedPassword
//                         });
        
//                         signedUpUser.save()
//                             .then(data => res.json(data))
//                             .catch(err => res.json(err));

//                     }).catch(err => {
//                         res.json({
//                             status: "FAILED",
//                             message: "Error occured while hashing password."
//                         });

//                     });
//                 }

//             }).catch(err => {
//                 res.json({
//                     status: "FAILED",
//                     message: "An error occured while checking for existing user"
//                 });
//             })
//         }
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// });

// router.post('/signin', async (req, res) => {
//     let{email, password} = req.body;

//     email = email.trim();
//     password = password.trim();

//     const signedinUser = {email: email};
//     //const user = await signUp.findOne({email});

//     if(email=="" || password==""){
//         res.json({
//             status: "FAILED",
//             message: "Empty credentials supplied"
//         });
//     }
//     else{
//         // try{
//         //     const user = await User.findOne({email: req.body.email});
//         //     !user && res.status(400).json("Wrong credentials!");

//         //     const validated = await bcrypt.compare(req.body.password, user.password);
//         //     !validated && res.status(400).json("Wrong Password!")
            
//         //     res.status(200).json(user);
//         // }
//         // catch(err){
//         //     res.status(200).json(err);
//         // }

//         User.find({email}).then(data => {
//             if(data){
//                 //User exists

//                 const hashedPassword = data[0].password;
//                 bcrypt.compare(password, hashedPassword).then(result => {
//                     if(result){
//                         //Password matched

//                         res.json({
//                             status: "SUCCESS",
//                             message: "Successfully Signed in.",
//                             token: generateToken(signedinUser)
//                         });
//                     }
//                     else{
//                         res.json({
//                             status: "FAILED",
//                             message: "Invalid password entered!"
//                         });
//                     }
//                 }).catch(err => {
//                     res.json({
//                         status: "FAILED",
//                         message: "Error occured while checking for password."
//                     });
//                 })
//             }
//             else{
//                 res.json({
//                     status: "FAILED",
//                     message: "Invalid credentials entered!"
//                 });
//             }
//         }).catch(err => {
//             res.json({
//                 status: "FAILED",
//                 message: "An error occured while checking for existing user."
//             });
//         });
//     }
// });

// //router.get('/signin');
// module.exports = router; 

const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { response, application } = require("express");
const jwt = require('jsonwebtoken');

//REGISTER
router.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  
  if(user){
    res.status(400).json("Email already exists!");
  }
  else{
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPass,
      });

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("User does not exist!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});


const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]

  if(!token){
    res.send("no token")
  }
  else{
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if(err){
        res.json({auth: false, message: "U failed to authenticate"});
      }
      else{
        req.userId = decoded.id;
        next();
      }
    })
  }
}

router.get('/isUserAuth', verifyJWT, (req, res) => {
  res.send("Yo, u are authenticated congrats!");
})

//LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     !user && res.send({auth: false, message: "User does not exist!"});

//     const validated = await bcrypt.compare(req.body.password, user.password);
//     !validated && res.send({auth: false, message: "Wrong credentials!"});

//     const id = user._id;
//     const token = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30d"});

//     //req.session.user = user;
//     //res.send(user);

//     const { password, ...others } = user._doc;
//     //req.session.user = others;

//     res.json({auth: true, token: token, result: others});
//     //res.json({auth: true, token: token, fullName: user.fullName, email: user.email});

//     //const { password, ...others } = user._doc;
//     //res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;