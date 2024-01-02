const path = require('path')
const express = require('express')
const router = new express.Router()

const bodyParser = require('body-parser')

const { client } = require('./mongodb')

const { handleFormSubmission } = require('./handlers.js')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'content', 'home.html'))
})
router.get('/breeds', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'content', 'breeds.html'))
})
router.get('/care', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'content', 'care.html'))
})
router.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'content', 'gallery.html'))
})
router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'content', 'contact.html'))
})
router.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'content', 'styles.css'))
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