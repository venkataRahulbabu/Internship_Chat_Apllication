const express = require('express')
const cors = require('cors')
require('dotenv').config()
const cookiesParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./routes/index')

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

// MongoDB Connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log("Connected to DB");
        })
        connection.on('error', (error) => {
            console.log("Something is wrong in mongodb ", error)
        })
    } catch (error) {
        console.log("Something is wrong ", error)
    }
}

app.get('/', (req, res) => {
    res.json({
        message: "Server running at " + PORT
    })
});

// API endpoints
app.use('/api',router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server listening on: " + PORT);
    })
});