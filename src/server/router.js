const { Router } = require('express')
const routes = require('./routes')

const router = Router()

module.exports = () => {
    /** API Routes first */
    router.use('/api/auth', routes.Auth)
    router.use('/api/users', routes.Users)

    /** Views Routes */
    router.use('/', routes.Views)

    return router
}