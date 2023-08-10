const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')

// Register new user
// POST /api/users
const registerUser = asyncHandler (async (req, res) => {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('All fields are required')
    }
    // Check if user exists
    if (await User.findOne({email})) {
        res.status(400)
        throw new Error('Email already in use')
    }
    // Hash password and create user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({name, email, password: hashedPassword})
    if (user) {
        res.status(201).json({
            name: user.name, email: user.email, token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// Authenticate a user
// POST /api/users/login
const loginUser = asyncHandler (async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if ( user && (await bcrypt.compare(password, user.password)) ) {
        res.json({
            name: user.name, email: user.email, token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// Get user data
// GET /api/users/profile
const getUserProfile = asyncHandler (async (req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {registerUser, loginUser, getUserProfile}
