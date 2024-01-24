// setup path to resolve request

//step1) import Express
const express = require('express')

    //import controller
    const userController = require('../controllers/userController')

    //import project controller
    const projectController = require('../controllers/projectController')

    //import jwtMiddleware
    const jwtMiddleware = require('../Middlewares/jwtMiddleware')

    //import multer
    const multerConfig = require('../Middlewares/multerMiddleware')

//step2) create an object for router classinside express
 const router = new express.Router()

 //step3) setup path to resolve request
 //syntax - router.httprequest('path to resolve',()=>{how to resolve})
    //a) Register
    router.post('/user/register',userController.register)

    //b) login
    router.post('/user/login',userController.login)

    //c) add project
    router.post('/projects/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addproject)

    //d) home project
    router.get('/project/home-project',projectController.gethomeProject)
 
     //e) all  project 
     router.get('/project/all-project',jwtMiddleware,projectController.getallproject)

     //e) user project
     router.get('/user/project',jwtMiddleware,projectController.getUserproject)
 
     //f) editProject
     router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)
     
     //g) delete project
     router.delete('/project/remove/:id',jwtMiddleware,projectController.deleteProject)

    //h) updateUser

    router.put('/user/update',jwtMiddleware,multerConfig.single("profile"),userController.editUser)



    //step4) export router
    module.exports = router