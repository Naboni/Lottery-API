require('dotenv').config()
const router = require("express").Router()
const { userRegister, userLogin } = require('../Utils/auth')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Register User
router.post('/register', async (req, res, next) => {
    await userRegister(req, res, next)
})
// Login User
router.post('/login', async (req, res, next) => {
    await userLogin(req, res, next)
})

router.get('/', async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                Lottery: true
            }
        })
        res.json({ message: "List of Users", users: users })
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                Lottery: true
            }
        })
        if (user) {
            res.json({ message: `User ${id}`, user: user })
        } else {
            res.json({ message: `User not found` })
        }
    } catch (error) {
        nextlog(error)
    }
})

router.patch('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: req.body,
            include: {
                Lottery: true
            }
        })
        res.json({ message: `Updated user ${id}`, updatedUser })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedUser = await prisma.user.delete({
            where: {
                id: Number(id),
            }
        })
        res.json({ message: `Deleted user ${id}`, deletedUser })
    } catch (error) {
        next(error)
    }
})

module.exports = router