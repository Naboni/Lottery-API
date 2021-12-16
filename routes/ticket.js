const { PrismaClient } = require("@prisma/client")
const router = require("express").Router()

const prisma = new PrismaClient()

router.post('/', async (req, res, next) => {
    const { ticketNumber, userId } = req.body;
    try {
        const ticket = await prisma.ticket.create({
            data: {
                ticketNumber,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            }
        })
        res.status(201).json(
            ticket
        )
    } catch (error) {
        next(error)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const tickets = await prisma.ticket.findMany({
            include: {
                user: true
            }
        })
        res.status(200).json(
            tickets
        )
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        const ticket = await prisma.ticket.findMany({
            where: {
                userId: Number(id)
            }
        })
        res.status(200).json(
            ticket
        )
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
        res.status(200).json(
            deletedTicket
        )
    } catch (error) {
        next(error);
    }
})

router.delete("/", async (req, res, next) => {
    try {
        const deleteTickets = await prisma.ticket.deleteMany()
        res.status(200).json(deleteTickets);
    } catch (error) {
        next(error)
    }
})

module.exports = router