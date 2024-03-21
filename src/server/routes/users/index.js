const { Router } = require('express')
const { create, get } = require('./actions')

const usersRouter = Router()

usersRouter.get('/:uuid', get)

module.exports = usersRouter