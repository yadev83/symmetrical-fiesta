const { prisma } = require('#utils')

module.exports = {
    login: (req, res) => {
        const {email, password} = req.body

        return prisma.user.findUnique({
            where: {
                email: email,
                password: password, // TODO : hash ?
            }
        }).then((user) => {
            if(!user) {
                req.session.error = 'Invalid username or password'
                return res.redirect('/login?e=' + encodeURIComponent('Incorrect username or password'))
            }

            // User has successfully logged in, update session
            req.session.userId = user.id
            req.session.isAuthenticated = true

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