const express = require('express')
const session = require('express-session')
const path = require('path')
const router = require('./router')

const publicPath = path.resolve(__dirname, '../../public')

const server = express()
server.set('port', process.env.PORT || 80)

server.use(session({
	secret: 'session-secret',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}))

server.use(express.json())
server.use(express.urlencoded({extended: false}))
server.use(express.static(publicPath))

// Block crawlers
server.use('/robots.txt', (req, res) => {
	res.type('text/plain')
	res.send('User-agent: *\nDisallow: /')
})

// Setup basic headers
server.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*')
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true)
	// Pass to next layer of middleware
	next()
})

// Map our routes to the server
server.use('/', router())

// This is reached if no routes could match (404)
server.use((req, res, next) => {
    res.status(404).send('Déso pas déso, c\'est introuvable ! (404)')
})

module.exports = server