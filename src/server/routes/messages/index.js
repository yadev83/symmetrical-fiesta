const { Router } = require('express')
const { checkuserauth } = require('#middlewares')
const { get, getAll, create } = require('./actions')

const messagesRouter = Router()

messagesRouter.get('/:id', get)
messagesRouter.get('/', getAll)

messagesRouter.post('/', checkuserauth(), create)

module.exports = messagesRouter