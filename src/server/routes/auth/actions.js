const { orm } = require('#utils')

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

            return res.redirect('/')
        }).catch(err => {
            console.error(`ERROR while creating a new user : ${err.toString()}`)
            return res.status(500).json({message: `ERROR while creating a new user : ${err.toString()}`})
        })
    },

    logout: (req, res) => {
        if(req.session)
            req.session.destroy()

        return res.redirect('/')
    }
}