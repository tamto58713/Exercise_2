const db = require('../db')
// db.defaults({user: {} })    
//   .write()

var customers = db.get('customers').value();

module.exports.index = (req, res) => {
    res.render('customer/index')
}
module.exports.login = (req, res) => {
    res.render('customer/login');
}
module.exports.listView = (req, res) => {
    res.render('customer/listview', {customers: customers})
}
module.exports.delete = (req, res) => {
    customers = customers.filter((customer) => {
        return customer.id !== parseInt(req.body.id);
    })
    res.render('customer/listview', {customers: customers})
}
module.exports.filture = (req, res) => {
    const value = req.body.f;
    filter = customers.filter((customer) => {
        return (customer.name.toLowerCase().indexOf(req.body.f.toLowerCase()) !== -1 ||
        customer.location.toLowerCase().indexOf(req.body.f.toLowerCase()) !== -1)
    })
    res.render('customer/listview', {customers: filter, value: value})
}
module.exports.postLogin = (req, res) => {
    res.render('/customer')
}