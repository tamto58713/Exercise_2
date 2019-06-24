const db = require('../db')
// db.defaults({user: {} })    
//   .write()

var pagination = require("../middleware/pagination")
var filter = require("../middleware/filter")

module.exports.index = (req, res) => {
    const value = filter.value;
    const customers = filter.customers;

    const itemPerPage = pagination.itemPerPage
    const customersPage = pagination.customersPage;
    const currentPage = pagination.currentPage
    res.render('customer', {customers: customers, currentPage: currentPage, 
    itemPerPage: itemPerPage, customersPage: customersPage, value:value})

}

module.exports.listView = (req, res) => {
    const value = filter.value;
    const customers = filter.customers;
    res.render('customer/listview', {customers: customers, value: value})
}

module.exports.login = (req, res) => {
    res.render('customer/login');
}

module.exports.delete = (req, res) => {

    customers = customers.filter((customer) => {
        return customer.id !== parseInt(req.body.id);
    })
    res.render('customer/listview', {customers: customers})
}
   
module.exports.postLogin = (req, res) => {
    res.render('/customer')
}