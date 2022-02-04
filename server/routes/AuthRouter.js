const express = require("express");
const router = express.Router();
/* controller */
const AuthController = require("../controllers/AuthController");

/* router.use(AuthMiddleware); */

/* routes */
router.route('/register').post(AuthController.createUser);
router.route('/login').post(AuthController.loginUser);
router.get('/logout', AuthController.logoutUser);
router.get('/logout', AuthController.logoutUser);
module.exports = router;
