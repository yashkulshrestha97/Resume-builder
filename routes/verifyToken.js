const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
    let token = req.header('auth-token');
    if(!token){
        token = req.session.token;
        if(token === undefined) {
            // return res.status(400).send('Access denied');
            return res.redirect('/api/user/login');
        }
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        req.token = token
        // console.log(req.user.name);
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid Token')
    }
}

