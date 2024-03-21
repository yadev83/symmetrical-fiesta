const { Router } = require('express')
const { renderIndex, renderLogin, renderRegister } = require('./actions')
const { checkuserauth } = require('#middlewares')

const viewsRouter = Router()

viewsRouter.get('/', checkuserauth(), renderIndex)
viewsRouter.get('/login', checkuserauth(false), renderLogin)
viewsRouter.get('/register', checkuserauth(false), renderRegister)

module.exports = viewsRouter