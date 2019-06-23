const db = require('../db')
const pagination = require("../middleware/pagination")
const filter = require("../middleware/filter")
// db.defaults({user: {} })    
//   .write()

var customers = db.get('customers').value();

module.exports.index = (req, res) => {
    res.render('customer', { customers: pagination.customersPage, itemPerPage: pagination.currentPage, currentPage: pagination.currentPage})
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
module.exports.filter = (req, res) => {
    value = req.query.f;
    res.render('customer/listview', {customers: filter.filter(value), value: filter.value})
}
module.exports.filterCard = (req, res) => {
    const value = req.query.f;
    filter = customers.filter((customer) => {
        return (customer.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
        customer.location.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    })
    res.render('customer', {customers: filter, value: value})
}

module.exports.page = (req, res) => {
 
}

module.exports.postLogin = (req, res) => {
    res.render('/customer')
}