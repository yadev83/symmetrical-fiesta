const { orm } = require('#utils')

const createUser = (email, name, password) => new Promise((resolve, reject) => {
    if(!(email && name && password)) {
        return reject('error while createUser: missing or invalid arguments')
    }

    return orm.user.create({
        data: {
            email,
            password,
            name
        }
    }).then(createdUser => {
        return resolve(createdUser)
    }).catch(err => {
        return reject(`error while createUser: ${err.toString()}`)
    })
})

const getUser = (id) => new Promise((resolve, reject) => {
    if(!id)
        return reject('error while getUser: missing or invalid id')

    return orm.user.findUnique({where: {id: parseInt(id)}}).then(fetchedUser => {
        if(!fetchedUser) {
            const error = new Error('not found')
            error.code = 404
            return reject(error)
        }

        return resolve(fetchedUser)
    }).catch(err => {
        return reject(`error while getUser: ${err.toString()}`)
    })
})

module.exports = {
    createUser,
    getUser,

    create: (req, res, next) => {
        const {email, name, password} = req.body

        return createUser(email, name, password).then(newUser => {
            return res.status(201).json(newUser)
        }).catch(err => {
            console.error(`[POST /api/users/] ${err.toString()}`)
            return res.status(err.code || 500).json({message: `[POST /api/users/] ${err.toString()}`, code: err.code || 500})
        })
    },

    get: (req, res, next) => {
        const {id} = req.params

        return getUser(id).then(user => {
            return res.status(200).json(user)
        }).catch(err => {
            console.error(`[GET /api/users/${id}] ${err.toString()}`)
            return res.status(err.code || 500).json({message: `[GET /api/users/${id}] ${err.toString()}`, code: err.code || 500})
        })
    },
}