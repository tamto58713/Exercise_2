const db = require("../db")
module.exports.requireLogin = (req, res, next) => {
    if (!req.cookies.userId)
    {

        res.redirect('/auth/login');
        return;
    }
    // if (!res.cookies.userId)
    // {
    //     res.redirect('auth/login');
    //     return;
    // }
    next();
}