const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV)
        console.log(`MongoDB Connected`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
