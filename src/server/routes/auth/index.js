const { Router } = require('express')
const { login, logout, register } = require('./actions')
const { checkuserauth } = require('#middlewares')

const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', register)
authRouter.get('/logout', checkuserauth(), logout)

module.exports = authRouter