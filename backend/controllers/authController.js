import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import User from '../schemas/User.js'

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please provide name, email, and password')
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400)
      throw new Error('An account with this email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const activationToken = crypto.randomUUID()

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      activationToken,
    })

    console.log('User created:', user)

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400)
      throw new Error('Please provide email and password')
    }

    const user = await User.findOne({ email })

    if (!user) {
      res.status(401)
      throw new Error('Invalid email or password')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(401)
      throw new Error('Invalid email or password')
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '30d',
    })

    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    next(error)
  }
}


