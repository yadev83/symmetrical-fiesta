const { getUser } = require("#actions/users")

module.exports = (connected = true) => {
    if(connected) {
        return (req, res, next) => {
            if(req.session?.userId) {
                // Get user and check that session id is the good one, or logout
                return getUser(req.session.userId).then(user => {
                    if(user.sid == req.sessionID) {
                        next()
                    } else {
                        req.session.error = 'you have been disconnected because you are connected elsewhere'
                        res.redirect('/login')
                    }
                })
            } else {
                res.redirect('/login')
            }
        }
    } else {
        return (req, res, next) => {
            if(req.session?.userId) {
                // Get user and check that session id is the good one, or logout
                return getUser(req.session.userId).then(user => {
                    if(user.sid == req.sessionID)
                        res.redirect('back')
                    else
                        next()
                })
            } else {
                next()
            }
        }
    }
}