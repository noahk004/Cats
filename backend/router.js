const path = require('path')
const express = require('express')
const router = new express.Router()

const bodyParser = require('body-parser')

const { client } = require('./mongodb')

router.get('/', (req, res) => {
    res.render('home')
})
router.get('/breeds', (req, res) => {
    res.render('breeds')
})
router.get('/care', (req, res) => {
    res.render('care')
})
router.get('/gallery', (req, res) => {
    res.render('gallery')
})
router.get('/contact', (req, res) => {
    res.render('contact')
})

router.use(bodyParser.urlencoded({ extended: true }))

router.post('/submit-form', express.json(), async (req, res) => {
    try {
        await client.connect();

        const database = client.db('cats');
        const collection = database.collection('messages');

        // Insert the new document into the collection
        const result = await collection.insertOne({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });
  
        res.sendFile(path.join(__dirname, '..', 'content', 'contact.html'))

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
  })

module.exports = router