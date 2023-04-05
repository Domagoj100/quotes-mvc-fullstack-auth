const express = require('express')
const router = express.Router()
const quotesController = require('../controllers/quotes')
// const { ensureAuth } = require('../middleware/auth')

router.get('/', quotesController.quotesRender)
router.get('/addQuote', quotesController.addQuote)
router.post('/createQuote', quotesController.createQuote)

router.get('/updateQuote', quotesController.updateQuote)
router.put('/updateQuote', quotesController.updateQuoteInDB)

router.delete('/deleteQuote', quotesController.deleteQuote)

module.exports = router