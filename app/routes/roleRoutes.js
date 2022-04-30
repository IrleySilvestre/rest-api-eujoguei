module.exports=(app)=>{
    const roleController = require('../controllers/roleController')
    const router = require('express').Router()

    router
    .post('/', roleController.add)
    .get('/', roleController.listAll)

    app.use("/role", router)
    
    
}