var http = require("http");
var url = require("url");
var util = require('util');
var queryString = require('querystring');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for url " + pathname + " received.");

        if (request.method == 'GET') {
            var queryObject = url.parse(request.url, true).query;
            route(pathname, handle, response, queryObject);
        } else {
            var chunk = '';
            request.on('data', function(data) {
                chunk += data;
            });
            request.on('end', function(){
                console.log(chunk);
                queryObject = queryString.parse(chunk);
                console.log(queryObject);
                route(pathname, handle, response, queryObject);
            });
        }
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}
exports.start = start;
