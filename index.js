const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const app = express()
const cors = require('cors')

connectDB()

app.use(cors({origin: process.env.NODE_ENV === 'production' ? 'https://moviesdata-react.netlify.app' : 'http://localhost:3000'}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/movies', require('./routes/movieRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port}`))
