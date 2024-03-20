const { Router } = require('express')
const { login, logout } = require('./actions')

const authRouter = Router()

authRouter.post('/login', login)
authRouter.get('/logout', logout)

module.exports = authRouter