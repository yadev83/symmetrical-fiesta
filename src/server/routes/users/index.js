const { Router } = require('express')
const { create, get } = require('./actions')

const usersRouter = Router()

usersRouter.get('/:id', get)

module.exports = usersRouter