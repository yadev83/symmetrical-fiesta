const { Router } = require('express')
const { getIndex, getLogin } = require('./actions')
const { checkuserauth } = require('#middlewares')

const viewsRouter = Router()

viewsRouter.get('/', checkuserauth, getIndex)
viewsRouter.get('/login', getLogin)

module.exports = viewsRouter