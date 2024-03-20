const { Router } = require('express')
const { getIndex } = require('./actions')

const viewsRouter = Router()

viewsRouter.get('/', getIndex)

module.exports = viewsRouter