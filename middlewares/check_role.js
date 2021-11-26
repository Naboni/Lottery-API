const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/index')

const check_role = (role) => (req, res, next) => {
    console.log(role)
    console.log(res.body)
    if (role === req.body.role) {
        console.log("worked")
        next()
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

module.exports = check_role