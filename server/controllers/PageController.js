
exports.getIndexPage = function (req, res) {
    res.render('index');
}

exports.getLoginPage = function (req, res) {
    res.render('login');
}

exports.getRegisterPage = function (req, res) {
    res.render('register');
}