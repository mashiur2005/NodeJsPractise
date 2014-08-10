var db = require("../db/db.js");
var ejs = require("ejs");
var fs = require("fs");

function newCustomer(response) {
    var templateFromStr = fs.readFileSync("./template/form.ejs", "utf8");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(ejs.render(templateFromStr, {
        customer : ''
    }));
    response.end();
}
function addCustomer(response, data) {
    db.save(data, response);
}

function updateCustomer(data, response) {
}

function deleteCustomer(response, data) {
}

function getAllCustomer(response) {
    var queryString = "select * from customer";
    db.getInfo(queryString, response);
}

function getCustomer(response, data) {
    var queryString = "select * from customer c where c.id = " + data.id;
    db.getInfo(queryString, response);
}

exports.new = newCustomer;
exports.addCustomer = addCustomer;
exports.updateCustomer = updateCustomer;
exports.getCustomer = getCustomer;
exports.allCustomer = getAllCustomer;
exports.deleteCustomer = deleteCustomer;
