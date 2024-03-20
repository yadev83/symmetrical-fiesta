const { orm } = require('#utils')
const { createUser } = require('#actions/users')


module.exports = {
    login: (req, res) => {
        const {email, password} = req.body

        return orm.user.findUnique({
            where: {
                email: email,
                password: password, // TODO : hash ?
            }
        }).then((user) => {
            if(!user) {
                req.session.error = 'Invalid username or password'
                return res.redirect('/login')
            }

            // User has successfully logged in, update session
            req.session.userId = user.id

            return orm.user.update({
                where: { id: req.session.userId },
                data: { sid: req.sessionID }
            }).then((tt) => {
                return res.redirect('/')
            })
        }).catch(err => {
            console.error(`ERROR while login : ${err.toString()}`)
            return res.status(500).json({message: `ERROR while login : ${err.toString()}`})
        })
    },

    register: (req, res) => {
        const {email, password, name} = req.body

        return orm.user.findFirst({
            where: {
                OR: [{
                    email: email
                }, {
                    name: name
                }]
            }
        }).then((user) => {
            if(user?.id) {
                req.session.error = 'username or email already in use'
                return res.redirect('/register')
            }

            req.session.error = null
            return createUser(email, name, password).then(newUser => {
                return res.redirect('/login')
            })
        }).catch(err => {
            console.error(`ERROR while registering a new user : ${err.toString()}`)
            return res.status(500).json({message: `ERROR while registering a new user : ${err.toString()}`})
        })
    },

    logout: (req, res) => {
        if(req.session && req.session.userId) {
            return orm.user.update({
                where: {
                    id: req.session.userId
                },
                data: {
                    sid: null
                }
            }).then(() => {
                req.session.destroy()
                return res.redirect('/')
            })
        }

        return res.redirect('/')
    }
}