//import mongoose
const mongoose = require('mongoose')

//acess connetion string of mongodb
const connectionString = process.env.DATABASE

//connect the server with mongodb
mongoose.connect(connectionString).then(()=>{
    console.log('mongodb connected successfully');
}).catch((err)=>{
    console.log(`mongodb connection failed due to :${err}`);
})