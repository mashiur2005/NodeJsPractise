var http = require("http");
var url = require("url");
var util = require('util');
var queryString = require('querystring');
var customer = require('../model/customer');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for url " + pathname + " received.");

        try {
            if (request.method == 'GET') {
                var queryObject = url.parse(request.url, true).query;
                route(pathname, handle, response, queryObject);
            } else {
                var chunk = '';
                request.on('data', function (data) {
                    chunk += data;
                });
                request.on('end', function () {
                    console.log(chunk);
                    queryObject = queryString.parse(chunk);
                    console.log(queryObject);
                    console.log("Object oriented testing.............");
                    var customerObj = new customer.Customer(queryObject);
                    console.log(customerObj.getCustomer());
                    route(pathname, handle, response, customerObj);
                });
            }
        } catch(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(error.message));
            response.end();
        } finally {
            console.log("worked here in finally..................");
            request.on('error', function (error) {
                console.log("worked here on error event................")
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(Error.message);
                response.end();
            });
        }
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}
exports.start = start;
