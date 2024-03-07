const jwt = require('jsonwebtoken');

export const verifyJWT = (req, decodedValue) => {
    // getting the headers value for authorization.
    const authorization = req.headers.authorization;

    // if not authorized returning a object with error set to true
    if (!authorization) {
        return {error: true}
    }

    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.sst_SecretKey, function (err, decoded) {
        // if any error occured during decoding returning an object with error value true
        if (err) return {error: true}

        // else setting the parameter decodedValue to decoded payload value.
        decodedValue = decoded;
    });
}