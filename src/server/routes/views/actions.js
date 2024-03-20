const path = require('path')
const { getUser } = require('#actions/users')

module.exports = {
    renderIndex: (req, res) => {
        getUser(req.session.userId).then(user => {
            return res.render('index', {user})
        }).catch(err => {
            console.error('ERROR while rendering index view', err.toString())
            return res.render('index')
        })
    },

    renderLogin: (req, res) => {
        return res.render('login', {error: req.session?.error || undefined})
    },

    renderRegister: (req, res) => {
        return res.render('register', {error: req.session?.error || undefined})
    }
}