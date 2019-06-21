const db = require('../db')
module.exports.validLogin = (req, res, next) => {
    const status = [];
    const email = req.body.email;
    const password = req.body.password;
    const user = db.get("customers").find({email: email}).value()
    if (email !== user.email || password !== user.password){
        status.push("Wrong Email or Password!");
        res.render('auth/login', {status})
        return;
    }
    res.redirect('/customer')
    next();
} 