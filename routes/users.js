require('dotenv').config()
const router = require("express").Router()
const { userRegister, userLogin } = require('../Utils/auth')
const { PrismaClient } = require('@prisma/client')
const check_auth = require('../middlewares/check_auth')
const check_role = require('../middlewares/check_role')
const prisma = new PrismaClient()

// Register User
router.post('/register', async (req, res, next) => {
    await userRegister(req, res, next)
})
// Login User
router.post('/login', async (req, res, next) => {
    await userLogin(req, res, next)
})

router.get('/', check_auth, async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                lotteries: true,
                tickets: true,
            }
        })
        res.json({ message: "List of Users", users: users })
    } catch (error) {
        next(error)
    }
})

router.get('/:id', check_auth, async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                lotteries: true,
                tickets: true
            }
        })
        if (user) {
            res.json(user)
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
                lotteries: true
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