const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { SECRET } = require('../config/index')

const userRegister = async (req, res, next) => {
    try {
        // validate email
        let emailNotTaken = await (validateEmail(req.body.email))
        if (!emailNotTaken) {
            return res.status(400).json({
                message: "Email is taken!"
            })
        }
        // hash password
        const password = await bcrypt.hash(req.body.password, 10)
        // create a new user
        const newUser = await prisma.user.create({
            data: {
                ...req.body,
                password
            }
        })
        res.status(201).json({
            message: "User Registered.",
            newUser
        })
    } catch (error) {
        next(error)
    }
}

const userLogin = async (req, res, next) => {
    try {
        let { email, password } = req.body
        console.log(req.body)
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(404).json({
                message: "Login Failed.",
            })
        }
        // compare hashed password
        let isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            // sign in token
            let token = jwt.sign({
                id: user.id,
                email: user.email,
            },
                SECRET,
                {
                    expiresIn: '24h'
                })
            let result = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
                gender: user.gender,
                role: user.role,
                phone: user.phone,
                token: `Bearer ${token}`,
                expiresIn: 24
            }
            return res.status(200).json({
                message: "User Logged in.",
                ...result
            })
        } else {
            return res.status(403).json({
                message: "Login Failed."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Unable to Login"
        })
        next(error)
    }
}

// email validate function
const validateEmail = async email => {
    let user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    return user ? false : true
}

module.exports = {
    userRegister,
    userLogin
}