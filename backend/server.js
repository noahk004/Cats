const express = require('express')

const router = require('./router')

const port = 3000

const app = express()

app.use(router)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})



