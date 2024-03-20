const { prisma, ENV } = require('./utils')
const server = require('./server')

const port = server.get('port')
server.listen(port, (err) => {
    console.log(`SERVER Listening : http://localhost:${port}`)
})