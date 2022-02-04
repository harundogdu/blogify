const User = require('../models/UserModel');

exports.getIndexPage = async function (req, res) {
    const user = await User.findById(req.session.userID);
    /*    res.render('index', { user }); */
    res.status(200).json({
        message: 'success',
        user
    });
}

exports.getLoginPage = function (req, res) {
    res.render('login');
}

exports.getRegisterPage = function (req, res) {
    res.render('register');
}