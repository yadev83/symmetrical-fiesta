const { Router } = require('express')
const { create, get } = require('./actions')

const usersRouter = Router()

usersRouter.post('/', create)
usersRouter.get('/', get)

module.exports = usersRouter