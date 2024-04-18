require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes')

// Using cors for cross-origin requests
// Using cookie-parser to handle cookies

const app = express()

mongoose.connect(process.env.MONGO)
.then(() => {
    // Define route for the root endpoint
    app.get("/", (req, res) => {
        res.status(200).send(`<h1>Welcome to task management app</h1>`);
    });
    
    console.log('Database Connected')

    // Set up middleware
    app.use(express.json())
    app.use(cors({
        origin: 'http://localhost:3000',
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        credentials: true
    }));
    app.use(cookieParser())

    // Mount the router for API endpoints
    app.use('/api', router)

    // Start the server
    app.listen(5000, () => console.log('Server is running on port 5000'))

})
.catch((err) => console.error(err))
