const jwt = require('jsonwebtoken')

const autharizationToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;

    try {
        if (!token) {
            return res.status(401).json({ message: "Authorisation Token is required" })
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.log(error);
            return res.status(403).json({ message: "Invalid of Expired Token" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { autharizationToken };