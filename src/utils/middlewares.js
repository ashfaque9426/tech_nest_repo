const jwt = require('jsonwebtoken');

export const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).send({ success: false, message: "Unauthorized Access" });
    }

    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.sst_SecretKey, function (err, decoded) {
        if (err) return res.status(403).send({ success: false, message: "Error Occured, Access Denied." });
        req.decoded = decoded;
        next();
    });
}