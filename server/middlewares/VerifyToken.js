const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authorization = req.header("Authorization");
    if (!authorization) {
        res.status(401).json({
            status: 401,
            message: "Unauthorized",
        });
        return;
    }
    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({
                status: 401,
                message: "Unauthorized",
            });
            return;
        }
        req.userId = decoded._id;
        next();
    });
}

module.exports = verifyToken;