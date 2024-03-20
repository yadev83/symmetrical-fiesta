const path = require('path')

const viewsPath = path.resolve(__dirname, '../../../application/views')
const getView = (name) => {
    return path.resolve(viewsPath, name)
}

module.exports = {
    getIndex: (req, res) => {
        if(req.session?.userId && req.session?.isAuthenticated)
            return res.sendFile(getView('index.html'))
        else
            return res.redirect('/login')
    },

    getLogin: (req, res) => {
        return res.sendFile(getView('login.html'))
    }
}