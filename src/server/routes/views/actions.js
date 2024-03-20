const path = require('path')

const viewsPath = path.resolve(__dirname, '../../../application/views')
const getView = (name) => {
    return path.resolve(viewsPath, name)
}

module.exports = {
    getIndex: (req, res) => {
        return res.sendFile(getView('index.html'))
    }
}