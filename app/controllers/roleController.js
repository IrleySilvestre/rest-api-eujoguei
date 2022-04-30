const Roles = require ('../model/rolesModel')

exports.add = (req, res)=>{
    const role = req.body

    Roles.add(role, (err, data)=>{
        if (err) {
            res.status(500).send({message: err.message})
        } else {
            res.status(200).json(data)      
        }
    })
}