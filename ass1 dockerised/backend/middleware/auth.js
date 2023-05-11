const jwt = require("jsonwebtoken");

// export default function auth(req, res, next) {
function auth(req, res, next) {
    try {
        const token = req.header("x-auth-token");
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = decoded.user;
            next()
        } catch (err) {
            console.log("middleware: ", err);
            return res.status(400).send("invalid token");
        }
    } catch (err) {
        console.log("middleware 2 : ", err);
        res.send("error");
    }
}

module.exports = auth
