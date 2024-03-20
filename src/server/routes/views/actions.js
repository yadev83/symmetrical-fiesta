const path = require('path')
const { getUser } = require('#actions/users')

module.exports = {
    getIndex: (req, res) => {
        getUser(req.session.userId).then(user => {
            return res.render('index', {user})
        }).catch(err => {
            console.error('ERROR while rendering index view', err.toString())
            return res.render('index')
        })
    },

    getLogin: (req, res) => {
        if(req.session?.userId)
            return res.redirect('/')

        return res.render('login', {error: req.session?.error || undefined})
    }
}