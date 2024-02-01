const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const router = express.Router();

const nodemailer =require("nodemailer")
const User = require('./userHandler');

const transporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.Email,
        pass:process.env.PASS

    }
});

router.get('/users',async(req,res)=>{
    try{
        const users = await User.find(); // Fetch all users from MongoDB
       users.forEach(user => {
        const mailOptions={
            from: process.env.Email,
            to :user.email,
            subject:"Sending Email",
            message:"message"
        };
        console.log(user.email);
        transporter.sendMail(mailOptions,(error,info)=>{
            if (error) {
                console.log("Error",error);
            }
            else{
                console.log("Email sent" + info.response);
                res.status(201).json({status:201,info})
            }
        });
       }); 
    }
    catch(error){
        console.log(error);
    res.status(500).json({ msg: "unable to get email data" });
    }
})
module.exports =router;


