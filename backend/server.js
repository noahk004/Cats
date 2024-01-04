const express = require('express')

const router = require('./router')

const port = 3000

const app = express()

app.set('view engine', 'ejs')

// Middleware
app.use(router)
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})



