
//step1) import dotenv
//loads .env file contents into process.env by default.
require('dotenv').config()

//step2) import express
const express = require('express')

//step3) import cors
const cors = require('cors')

// import router
const router = require('./Routers/router')

//import connection.js file
require('./DB/connection')

//step4)  create server
//create an express application. the express() function is a top-level function exported by the express module.
const project_fair_server = express()

//step5) use of cors in server
project_fair_server.use(cors())

//step6) Returns middleware that only parses json - javascript object
project_fair_server.use(express.json())

//use of router by server
project_fair_server.use(router)

//server use uploads folder
//first argument - the way in which other applications shoud use this folder
//second argument - export that folder - express.static
project_fair_server.use('/uploads',express.static('./uploads'))

//step7) customize the port - by default -3000
const PORT = 4000 || process.env

//step8) to run server 
project_fair_server.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

//get request
project_fair_server.get('/',(req,res)=>{
    res.send(`<h1 style='color:red'>project fair server running successfully and ready to accept request for client</h1>`)
})

//post request
project_fair_server.post('/',(req,res)=>{
    res.send(`post request`)
})
