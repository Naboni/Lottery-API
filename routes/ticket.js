const { PrismaClient } = require("@prisma/client")
const router = require("express").Router()

const prisma = new PrismaClient()

router.post('/', async (req, res, next) => {
    try {
        const ticket = await prisma.ticket.create({
            data: req.body
        })
        res.status(201).json({
            message: "Ticket Created.",
            ticket
        })
    } catch (error) {
        next(error)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const tickets = await prisma.ticket.findMany({
            include: {
                User: true
            }
        })
        res.status(200).json({
            message: "Tickets List",
            tickets
        })
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        const ticket = await prisma.ticket.findFirst({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            message: "Ticket with an id " + id,
            ticket
        })
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedTicket = await prisma.ticket.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            message: "Deleted Ticket",
            deletedTicket
        })
    } catch (error) {

    }
})

module.exports = router