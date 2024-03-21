const path = require('path')
const { getUser } = require('#actions/users')

module.exports = {
    renderIndex: (req, res) => {
        getUser(req.session.user.uuid).then(user => {
            return res.render('index', {alert: req.session?.alert || undefined, user})
        }).catch(err => {
            console.error('ERROR while rendering index view', err.toString())
            return res.render('index', {alert: req.session?.alert || undefined})
        })
    },

    renderLogin: (req, res) => {
        return res.render('login', {alert: req.session?.alert || undefined})
    },

    renderRegister: (req, res) => {
        return res.render('register', {alert: req.session?.alert || undefined})
    }
}