require('dotenv').config()

const express = require ('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const workoutRoutes = require('./routes/workouts')
const bukuRoutes = require('./routes/bukuRoutes')

// express app
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/buku', bukuRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connect to mongodb and listening for requests on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

