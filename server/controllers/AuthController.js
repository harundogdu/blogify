const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, repassword } = req.body;
        if (password !== repassword) {
            res.status(400).redirect('/register');
        } else {
            const user = new User({
                name,
                email,
                password
            });
            await user.save();
            res.status(200).redirect('/login');
        }
    } catch (error) {
        console.log(error);
        res.status(400).redirect('/register');
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        await User.findOne({ email }, (err, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        // USER SESSION
                        req.session.userID = user._id;
                        res.status(200).redirect('/');
                    } else {
                        res.status(400).redirect('/login');
                    }
                });
            } else {
                res.status(400).redirect('/login');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}


exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id)
        await Course.deleteMany({ user: req.params.id })

        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};