const express = require('express');
const app = express();
app.use(express.json());  

const cors = require("cors");
const bodyparser = require("body-parser");

const Auth = require("./src/routes/AuthRoutes.js");
const { verifyTokenEmployee } = require('./src/middleware/AdminMiddleware.js');
const Admin = require('./src/routes/AdminRoutes.js')

app.use(cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use((req,res,next)=>{                                           
    res.setHeader("Access-Control-Allow-Origin","*")
    res.setHeader("Access-Control-Allow-Method","GET,POST,PUT,DELETE,OPTIONS")
    res.setHeader("Access-Control-Allow-Headers","Content-Type")
    res.setHeader("Access-Control-Allow-Credentials",true)
    next();
})

app.use('/auth',Auth)
app.use('/admin',verifyTokenEmployee,Admin)


module.exports = app;