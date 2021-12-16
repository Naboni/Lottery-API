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
    const { userId } = req.body;
    try {
        const lottery = await prisma.lottery.create({
            data: {
                lotteryNumbers: stringObj,
                user: {
                    connect: {
                        id: userId,
                    }
                }
            }
        })
        res.status(201).json(
            lottery
        )
    } catch (error) {
        next(error)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const lotteries = await prisma.lottery.findMany({
            include: {
                user: true
            }
        })
        res.status(200).json(
            lotteries
        )
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
        res.status(200).json(
            lottery
        )
    } catch (error) {
        next(error)
    }
})

router.patch("/:id", async (req, res, next) => {
    const { id } = req.params
    try {
        const patchedLottery = await prisma.lottery.update({
            where: {
                id: Number(id)
            },
            data: req.body,
        })
        res.status(200).json(
            patchedLottery
        )
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
        res.status(200).json(
            deletedLottery
        )
    } catch (error) {
        next(error)
    }
})

module.exports = router