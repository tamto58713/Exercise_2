const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

// db.defaults({user: {} })    
//   .write()

const customers = db.get('customers').value();

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
    
}