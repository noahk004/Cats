const http = require('node:http')
const path = require('path')
const fs = require('fs')
const { handleGetRequest, handleFormSubmission } = require('./handlers.js')

const hostname = '127.0.0.1'

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        handleGetRequest(req, res)
    } else if (req.method === 'POST') {
        if (req.url === '/submit-form') {
            handleFormSubmission(req, res)
        }
    }
})

const port = 3000
server.listen(port, hostname, () => console.log(`Server running on port ${port}`))




