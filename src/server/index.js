const path = require('path')
const express = require('express')
const { prisma } = require('./utils')

const app = express()
const port = process.env.PORT || 80

const publicPath = path.resolve(__dirname, '../../public')
const viewsPath = path.resolve(__dirname, '../application/views')

app.use(express.static(publicPath))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(viewsPath, 'index.html'))
})

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
    console.log(`SERVER Listening : http://localhost:${port}`)
})