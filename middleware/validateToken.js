const jwt = require('jsonwebtoken')

const autharizationToken = async (req, res, next) => {
    const token = req.headers.token;

    try {
        if (!token) {
            return res.status(401).json({ message: "Authorisation Token is required" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { autharizationToken };