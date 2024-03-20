const { prisma } = require('#utils')

module.exports = {
    create: (req, res) => {
        const {email, name, password} = req.body

        return prisma.user.create({
            data: {
                email,
                password,
                name
            }
        }).then((result) => {
            return res.status(200).json(result)
        }).catch(err => {
            console.error(`ERROR while creating a new user : ${err.toString()}`)
            return res.status(500).json({message: `ERROR while creating a new user : ${err.toString()}`})
        })
    },

    get: (req, res) => {
        const {id} = req.query

        const readP = id ? prisma.user.findUnique({where: {id: parseInt(id)}}) : prisma.user.findMany()

        return readP.then(result => {
            return res.status(200).json(result)
        }).catch(err => {
            console.error(`ERROR while getting users : ${err.toString()}`)
            return res.status(500).json({message: `ERROR while getting users : ${err.toString()}`})
        })
    }
}