const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] })
    if (existing) return res.status(409).json({ message: 'User already exists' })

    const hashed = await bcrypt.hash(password, 10)
    const user = new User({ username, email, password: hashed, fullName })
    await user.save()

    const userObj = user.toObject()
    delete userObj.password
    res.status(201).json({ user: userObj })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
