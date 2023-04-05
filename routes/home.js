const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')

// home routes
router.get('/', homeController.homeRender)
router.get('/fetchquote', homeController.fetchQuote)

//auth routes
router.get('/account', authController.renderAccount)
router.post('/account/signup', authController.createAccount)
router.post('/account/login', authController.loginAccount)
router.get('/account/logout', authController.logoutAccount)

module.exports = router