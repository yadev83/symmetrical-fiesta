const { Router } = require('express')
const { getIndex, getLogin } = require('./actions')

const viewsRouter = Router()

viewsRouter.get('/', getIndex)
viewsRouter.get('/login', getLogin)

module.exports = viewsRouter