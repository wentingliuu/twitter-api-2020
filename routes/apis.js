const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const passport = require('../config/passport')

const adminController = require('../controllers/api/adminControllers')
const userController = require('../controllers/api/userControllers')
const tweetController = require('../controllers/api/tweetControllers')

const authenticated = passport.authenticate('jwt', { session: false })
const authenticatedAdmin = function authenticatedAdmin (req, res, next) {
  if (helpers.getUser(req)) {
    if ((helpers.getUser(req).role = 'admin')) {
      return next()
    }
    return res.json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}

router.post('/admin/signin', adminController.signIn)

router.post('/signin', userController.signIn)
router.post('/users', userController.signUp)

router.get('/users', authenticated, userController.getUsers)
router.get('/tweets', authenticated, tweetController.getTweets)

module.exports = router