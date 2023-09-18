// inital configuration
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const res = require('express/lib/response')

// read JSON 
app.use(
    express.urlencoded({
        extended: true
    }), express.json()

)
//app.use(express.json())


// API routes
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

// inital route / endpoint
app.get('/', (req, res) => {
    // show req
    //req.json(req.json)

    res.json({ message: 'hello world!' })
})

//  deliver a port 
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@elliot-test.eda44qg.mongodb.net/dbapi?retryWrites=true&w=majority&appName=AtlasApp`
)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(3000)
    })
    .catch((err) => console.log(err))
