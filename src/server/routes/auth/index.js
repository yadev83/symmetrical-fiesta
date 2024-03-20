const { Router } = require('express')
const { login, logout, register } = require('./actions')

const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.get('/logout', logout)

module.exports = authRouter