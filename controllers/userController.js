const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const {body, validationResult } = require('express-validator')
const User = require('../models/User')

// Register new user
// POST /api/users
const registerUser = [
    body('email').notEmpty().escape().withMessage('Email is required'),
    body('password').notEmpty().escape().withMessage('Password is required'),
    body('name').notEmpty().escape().withMessage('Username is required'),

    asyncHandler (async (req, res) => {
        const {name, email, password} = req.body
        const errors = validationResult(req)
        const errsObject = errors.mapped()
        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error(JSON.stringify(errsObject))
        }
        // Check if user exists
        if (await User.findOne({email})) {
            res.status(400)
            errsObject.regfail = 'Email already in use'
            throw new Error(JSON.stringify(errsObject))
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
]

// Authenticate a user
// POST /api/users/login
const loginUser = [
    body('emailLogin').notEmpty().escape().withMessage('Email is required'),
    body('passwordLogin').notEmpty().escape().withMessage('Password is required'),

    asyncHandler (async (req, res) => {
        
        const {emailLogin, passwordLogin} = req.body
        const user = await User.findOne({email: emailLogin})
        const errors = validationResult(req)
        const errsObject = errors.mapped()
        if(!errors.isEmpty()) {
            res.status(400)
            throw new Error(JSON.stringify(errsObject))
        } else {
            if ( user && (await bcrypt.compare(passwordLogin, user.password)) ) {
                res.json({
                    name: user.name, email: user.email, token: generateToken(user._id)
                })
            } else {
                res.status(400)
                errsObject.authfail = 'Invalid credentials'
                throw new Error(JSON.stringify(errsObject))
            }
        }

    })
]

// Get user data
// GET /api/users/profile
const getUserProfile = asyncHandler (async (req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {registerUser, loginUser ,getUserProfile}
