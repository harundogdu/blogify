const User = require("../models/UserModel");

module.exports = (req, res, next) => {
    User.findById(req.session.userID, (err, user) => {
        if (err || !user) return res.redirect('/login');
        next();
    });
};