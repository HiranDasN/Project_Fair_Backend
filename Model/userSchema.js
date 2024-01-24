//import mongoose
const mongoose = require('mongoose')

//create schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,"Must be atleast 3 characters but got {VALUE}"]
    },
    email:{
        type:String,
        require:true,
        unique:true,
        //if input value is not proper email then it will throw an error and return invalid email
        //isEmail is a method in validator which check whether the input is a proper email id or not
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid Email")
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String    
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }
})

//create model
const users = mongoose.model("users",userSchema)


//export
module.exports = users