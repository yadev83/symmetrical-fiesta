const { orm, serverError } = require('#utils')
const { createUser } = require('#actions/users')
const { scryptSync } = require('crypto')

const getPasswordHash = (password) => scryptSync(password, 'salt', 64).toString('hex')

const authenticateUser = (email, password, sessionID = null) => new Promise((resolve, reject) => {
    const hash = getPasswordHash(password)

    return orm.user.findUnique({
        where: {
            email: email,
            password: hash
        }
    }).then((user) => {
        // User could not be found in DB => ERROR during auth
        if(!user) {            
            return reject(serverError('Invalid username or password', 401))
        }

        // Success during auth => update sessionID and return user
        return orm.user.update({
            where: { id: user.id },
            data: { sid: sessionID }
        }).then((authdUser) => {
            return resolve(authdUser)
        })
    }).catch(err => {
        return reject(serverError(err.toString(), err.code || 500))
    })
})

const registerUser = (email, password, name) => new Promise((resolve, reject) => {
    return orm.user.findFirst({
        where: {
            OR: [{
                email: email
            }, {
                name: name
            }]
        }
    }).then((existingUser) => {
        // If we got an existingUser
        if(existingUser?.id) {
            return reject(serverError('Username or Email already in use', 500))
        }

        // Hash password
        hash = getPasswordHash(password)

        // Insert user in database
        return createUser(email, name, hash).then(newUser => {
            return resolve(newUser)
        })

    }).catch(err => {
        return reject(serverError(err.toString(), err.code || 500))
    })
})

module.exports = {
    login: (req, res) => {
        const {email, password} = req.body

        return authenticateUser(email, password, req.sessionID).then(user => {
            // Store public user data in session
            req.session.user = {
                uuid: user.uuid,
                name: user.name
            }
            req.session.alert = undefined
            
            return res.redirect('/')
        }).catch(err => {
            req.session.alert = {type: 'error', message: err.toString()}

            console.error(`ERROR while login: ${err.toString()}`)
            return res.redirect('/login')
        })
    },

    register: (req, res) => {
        const {email, password, name} = req.body

        return registerUser(email, password, name).then(newUser => {
            req.session.alert = {type: 'success', message: 'successfully registered'}
            return res.redirect('/login')
        }).catch(err => {
            req.session.alert = {type: 'error', message: err.toString()}

            console.error(`ERROR while register: ${err.toString()}`)
            return res.redirect('/register')
        })
    },

    logout: (req, res) => {
        const uuid = req.session.user.uuid

        if(uuid) {
            return orm.user.update({
                where: { uuid },
                data: { sid: null }
            }).then(() => {
                req.session.destroy()
                return res.redirect('/')
            })
        }

        return res.redirect('/')
    }
}