import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'

// login user
const loginUser = async (req,res) => {
    const { email, password } = req.body
    try {
        // search user data on db
        const user = await userModel.findOne({email})
        // user check not match
        if (!user) {
            return res.json({success:false, message:"User does not exist"})
        }
        // user password check match
        const isMatch = await bcrypt.compare(password, user.password)

        // check password match
        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentials"})
        }
        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


// token
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req,res) => {
    const { name, password, email } = req.body
    try {
        // checking is user already exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success: false, message:"User already exists"})
        }
        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message:"Please enter valid email"})
        }
        // length password
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter strong password"})
        }

        // create account

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        // save user
        const user = await newUser.save()

        // create token
        const token = createToken(user._id)
        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {loginUser,registerUser}