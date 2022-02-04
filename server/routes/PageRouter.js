const express = require('express');
const router = express.Router();

/* define controller */
const PageController = require('../controllers/PageController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const RedirectMiddleware = require('../middlewares/RedirectMiddleware');

/* define routes */
router.route('/').get(AuthMiddleware, PageController.getIndexPage)
router.route('/login').get(RedirectMiddleware, PageController.getLoginPage)
router.route('/register').get(RedirectMiddleware, PageController.getRegisterPage)

module.exports = router;