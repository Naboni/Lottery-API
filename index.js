require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const userRoutes = require('./routes/users')
const lotteryRoutes = require('./routes/lottery')
const ticketRoutes = require('./routes/ticket')

// prisma instance
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// route middlewares
app.use('/api/user', userRoutes)
app.use('/api/lottery', lotteryRoutes)
app.use('/api/ticket', ticketRoutes)

// catching error
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port ` + port)
})