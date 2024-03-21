const { getUser } = require('#actions/users')
const { orm, serverError } = require('#utils')

const insertMessage = (message, userUUID) => new Promise((resolve, reject) => {
    if(!(message?.length && userUUID)) {
        return reject(serverError('Bad Request', 400))
    }

    return getUser(userUUID).then(user => {
        if(!user) {
            return reject(serverError('Unauthorized', 401))
        }

        return orm.message.create({
            data: {
                content: message,
                userId: user.id
            }
        }).then(insertedMessage => {
            return resolve(insertedMessage)
        }).catch(err => {
            return reject(serverError('Could not insert user', 500))
        })
    })
})

module.exports = {
    get: (req, res) => {

    },

    getAll: (req, res) => {
        return orm.message.findMany({
            include: {
                user: {
                    select: {
                        uuid: true,
                        sid: true,
                        name: true
                    }
                }
            }
        }).then(messages => {
            return res.status(200).json(messages)
        }).catch(err => {
            return res.status(500).json({message: err.toString()})
        })
    },

    create: (req, res) => {
        const {message} = req.body
        const uuid = req.session.user.uuid

        return insertMessage(message, uuid).then(message => {
            return res.status(201).json(message)
        }).catch(err => {
            console.error(`[POST /api/messages/] ${err.toString()}`)
            return res.status(err.code || 500).json({message: `[POST /api/messages/] ${err.toString()}`, code: err.code || 500})
        })
    } 
}