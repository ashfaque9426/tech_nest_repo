const jwt = require('jsonwebtoken');

export const verifyJWT = (req) => {
    // getting the headers value for authorization.
    const authorization = req.headers.authorization;

    // if not authorized returning a object with error set to true
    if (!authorization) {
        return { error: true, message: 'Unauthorized Acces. Access Denied.', status: 401 };
    }

    const token = authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.sst_SecretKey);
        return { decoded, error: null, message: "", status: 0 };
    } catch (err) {
        if (err) console.log(err);
        return { error: true, message: 'Authorization error, Access Denied.', status: 403 };
    }
}