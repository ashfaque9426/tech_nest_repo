const jwt = require('jsonwebtoken');
import { headers } from 'next/headers'

export const verifyJWT = (req, res, next) => {
    const authorization = headers().get('authorization');

    if (!authorization) {
        return res.status(401).send({ error: true, message: "Unauthorized Access" });
    }

    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.sst_SecretKey, function (err, decoded) {
        if (err) return res.status(403).send({ error: true, message: "Access Denied" });
        req.decoded = decoded;
        next();
    });
}