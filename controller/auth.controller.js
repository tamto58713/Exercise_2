
const db = require('../db')

module.exports.login = (req, res) => {
    res.render('auth/login')
}
module.exports.postLogin = (req, res) => {
    const status = [];
    const email = req.body.email;
    const password = req.body.password;
    const user = db.get("customers").find({email: email}).value()
    if (email !== user.email || password !== user.password){
        status.push("Wrong Email or Password!");
        res.render('auth/login', {status})
        return;
    }
    res.cookie('userId', user.id);
    res.render('customer', {currentUser: user})
}
module.exports.logout = (req, res) => {
    res.clearCookie('userId', req.cookies.userId)
    res.redirect("/customer");
   
}