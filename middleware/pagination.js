const filter = require("../middleware/filter")
var customers = filter.filter();

module.exports = {
    itemPerPage: 8,
    maxItem: customers.length,
    currentPage: () => {
        var currentPage = parseInt(req.query.page) || 1
        if (currentPage > Math.round(maxItem/itemPerPage))
            currentPage = Math.round(maxItem/itemPerPage)
        if (currentPage < 1)
            currentPage = 1;
    
        const first = parseInt(req.query.first);
        const prev = parseInt(req.query.prev);
        const nextt = parseInt(req.query.next);
        const last = parseInt(req.query.last);
    
        if (first)
            currentPage = 1;
        if (prev)
            currentPage = prev -1;
        if (nextt)
            currentPage = next + 1;
        if (last) 
            currentPage = Math.round(maxItem/itemPerPage)
    },
    customersPage: () => {
        if ((this.currentPage * this.itemPerPage + this.itemPerPage) > this.maxItem) {
            const start = this.maxItem - this.itemPerPage;
            const end = this.maxItem + 1;
            return customers.slice(start, end);
        }
        const start = (this.currentPage - 1) * this.itemPerPage;
        const end = start + this.itemPerPage;
        return customers.slice(start, end);
    }

}
