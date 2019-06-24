
var pagination = require("../middleware/pagination")
var filter = require("../middleware/filter")
var user = require("../controller/auth.controller")
module.exports.index = (req, res) => {
    const value = filter.value;
    const customers = filter.customers;
    const currentUser = user.currentUser|| {name: ""}
    const itemPerPage = pagination.itemPerPage
    const customersPage = pagination.customersPage;
    const currentPage = pagination.currentPage
    const tabPage = pagination.tabPage;
    res.render('customers', {customers: customers, currentPage: currentPage, 
    itemPerPage: itemPerPage, customersPage: customersPage, value:value, currentUser: currentUser, tabPage: tabPage})

}

module.exports.listView = (req, res) => {
    const currentUser = user.currentUser|| {name: ""}
    const value = filter.value;
    const customers = filter.customers;
    res.render('customers/listview', {customers: customers, value: value, currentUser: currentUser})
}

module.exports.login = (req, res) => {
    res.render('customers/login');
}

module.exports.delete = (req, res) => {
    var customers = filter.customers;
    const value = filter.value;
    customers = customers.filter((customer) => {
        return customer.id !== parseInt(req.body.id);
    })
    res.render('customers/listview', {customers: customers, value: value})
}
   
