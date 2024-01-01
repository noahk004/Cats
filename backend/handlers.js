const path = require('path')
const fs = require('fs')
const querystring = require('querystring')

const { client } = require('./mongodb')

const getContentType = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.html':
            return 'text/html'
        case '.css':
            return 'text/css'

            default:
            return null
    }
};

const serveFile = (filePath, res) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        const contentType = getContentType(filePath) || 'text/plain'
        res.setHeader('Content-Type', contentType)
        res.end(data)
    })
}

const handleGetRequest = (req, res) => {
    try {
        switch(req.url) {
            case '/':
                serveFile(path.join(__dirname, '..', 'content', 'home.html'), res)
                break
            case '/breeds':
                serveFile(path.join(__dirname, '..', 'content', 'breeds.html'), res)
                break
            case '/care':
                serveFile(path.join(__dirname, '..', 'content', 'care.html'), res)
                break
            case '/gallery':
                serveFile(path.join(__dirname, '..', 'content', 'gallery.html'), res)
                break
            case '/contact':
                serveFile(path.join(__dirname, '..', 'content', 'contact.html'), res)
                break
            case '/styles.css':
                serveFile(path.join(__dirname, '..', 'content', 'styles.css'), res)
                break
            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' })
                res.end('404 Not Found')
        }
    } catch (err) {
        console.error(err)
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('500 Internal Server Error')
    }
}

const handleFormSubmission = (req, res) => {
    let body = ''

    req.on('data', (chunk) => {
        body += chunk.toString()
    })

    req.on('end', async () => {
        const data = querystring.parse(body)

        await client.connect()
        db = client.db('cats')
        collection = db.collection('messages')

        collection.insertOne(data).then(() => {
            client.close()
        })

        serveFile(path.join(__dirname, '..', 'content', 'contact.html'), res)
    });
}

module.exports = {
    handleGetRequest,
    handleFormSubmission
}