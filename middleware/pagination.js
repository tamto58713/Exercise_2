var filter = require('../middleware/filter')
module.exports.page = (req, res, next) => {
    console.log(req.query)
    var customers = filter.customers;
    const itemPerPage = 8;
    const maxItem = customers.length;
    var currentPage = parseInt(req.query.page) || 1 
    console.log(currentPage)
    if (currentPage > Math.round(maxItem/itemPerPage))
        currentPage = Math.round(maxItem/itemPerPage)

    if (currentPage === 0)
        currentPage = 1;
    var first = parseInt(req.query.first);
    var prev = parseInt(req.query.prev);
    var nextt = parseInt(req.query.next);
    var last = parseInt(req.query.last);
    if (first)
        currentPage = 1;
    if (prev)
        if (prev === 1)
            currentPage = 1;
        else
            currentPage = prev - 1;
    if (nextt)
        if (nextt === maxItem)  
            currentPage = maxItem;
            else
            currentPage = nextt + 1;
    if (last) 
        currentPage = Math.round(maxItem/itemPerPage)
    if (customers.length <= 8) {
        var sliced = customers;
    }
    else
    if ((currentPage * itemPerPage + itemPerPage) > maxItem) {
        var start = maxItem - itemPerPage;
        var end = maxItem + 1;
        var sliced = customers.slice(start, end);
    }
    else {
        var start = (currentPage - 1) * itemPerPage;
        var end = start + itemPerPage;
        var sliced = customers.slice(start, end);
    }
    module.exports.currentPage = currentPage
    module.exports.itemPerPage = itemPerPage 
    module.exports.customersPage = sliced 
    module.exports.customers = customers
    module.exports.tabPage = Math.floor((currentPage - 1)/3) + 1;
    next(); 

}