// logic  to resolve the request


//import model
const users = require('../Model/userSchema')

//import jwt -> json web token -> for securely passing data btw json components
const jwt = require('jsonwebtoken')


exports.register = async(req,res)=>{
     //logic
     console.log('inside the controller - register function');
    //extract data from the request body - json format is converted into javascript object by json() method so that we an directly destructure the keys from the request body
    const {username,email,password}=req.body
    try{const existUser = await users.findOne({email})
   //findone returns only 2 response :- document and null -> if there is a positive response then it returns a document else Null
   if(existUser){
    //406 -> unprocessable entity error of client side
    res.status(406).json("Account Already exists....Please Login")
   }
   else{
    //need to register 
    //step1) create an object for the model
      const newUser = new users({
         username,
         email,
         password,
         github:"",
         linkedin:"",
         profile:""
      })
    //step2) add to mongodb -> use save method in mongoose
     await newUser.save()
    //response
    res.status(200).json(newUser)
   }
}//runtime errors are resolved using try-catch block
catch(err){
   res.status(401).json(`Registration request Failed due to ${err}`)
}
}

//login request
exports.login = async (req,res)=>{

   const {email,password} = req.body
   try{
      const existingUser = await users.findOne({email,password})
      console.log(existingUser);

      if(existingUser){
         //jwt token
         //payload - information that is secretly transmitted
         //SecretOrPrivatekey - key based on which the token is generated
       const token =  jwt.sign({userId:existingUser._id},"hiransupersecret007")

         //if user document exist
         //sending as object because we are sending more than one data
         res.status(200).json({existingUser,token})
      }
      else{
         res.status(404).json('Invalid EmailId or password')
      }
   }catch(err){
      res.status(401).json(`login request failed due to :${err}`)
   }
}

//update profile
exports.editUser = async(req,res)=>{
   const userId = req.payload
   const {username,email,password,github,linkedin,profile} = req.body
   const uploadImage = req.file?req.file.filename:profile
   try {

       const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:uploadImage},{new:true})

       await updateUser.save()
       res.status(200).json(updateUser)

       
   } catch (err) {
       res.status(401).json(err)
   }

}