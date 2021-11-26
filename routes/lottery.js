const { PrismaClient } = require("@prisma/client")
const router = require("express").Router()

const prisma = new PrismaClient()

router.post('/', async (req, res, next) => {
    let lots = []
    for (let index = 0; index < 10; index++) {
        const num = Math.floor(Math.random() * 10000000)
        lots.push(num)
    }
    var stringObj = JSON.stringify(lots);
    try {
        const lottery = await prisma.lottery.create({
            data: {
                ...req.body,
                lotteryNumbers: stringObj
            }
        })
        res.status(201).json({
            message: "Lottery Created.",
            lottery
        })
    } catch (error) {
        next(error)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const lotteries = await prisma.lottery.findMany({
            include: {
                User: true
            }
        })
        res.status(200).json({
            message: "Lotteries List",
            lotteries
        })
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        const lottery = await prisma.lottery.findFirst({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            message: "Lotter with an id " + id,
            lottery
        })
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedLottery = await prisma.lottery.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            message: "Deleted Lottery",
            deletedLottery
        })
    } catch (error) {

    }
})

module.exports = router