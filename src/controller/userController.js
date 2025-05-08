const user = require('../models/user');
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req,res) => {

    //As we have three collections in our model so we have created 3 variables
    const { username, email, password } = req.body;

    try{
        //Existing user check
        const existingUser = await userModel.findOne({email : email});
        if(existingUser){
            return res.status(400).json({
                message : "User already Exist"
            })
        }

        //This will converted the password to hashpassword  
        //Hashed Passoword
        const hashPassword = await bcrypt.hash(password,10);

        //Creating new user  //User Creation
        const result = await userModel.create({
            email : email,
            password : hashPassword,
            username : username
        });

        //Token generation

        const token = jwt.sign({
            email : result.email,
            id:result._id
        },process.env.SECREAT_KEY)


        res.status(201).json({
            user : result,
            token : token,
            message : "User Created Successfully"
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : "Something went wrong"
        })
    }
}


//SIGN IN
const signin = async (req,res) => {


    const {email,password} = req.body;

    try{
        const existingUser = await userModel.findOne({email : email});

        if(!existingUser){
            return res.status(404).json({
                message : "User not found"
            })
        }

        //Compare with password

        const matchPassword = await bcrypt.compare(password,existingUser.password);
        if(!matchPassword){
            return res.status(404).json({
                message : "Invalid Credentials"
            })
        }

        //Token 
        const token = jwt.sign({
            email : existingUser.email,
            id:existingUser._id
        },process.env.SECREAT_KEY)


        res.status(200).json({
            user : existingUser,
            token : token,
            message : "User found"
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : "Something went wrong"
        })
    }
    
}

module.exports = {signup,signin}