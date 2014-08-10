function route(pathname, handle, response, queryObject) {
    console.log("About a route a request for " + pathname);

    if (typeof handle[pathname] === "function") {
        handle[pathname](response, queryObject);
    } else {
        console.log("No request Handler found for the path " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 not found");
        response.end();
    }
}

exports.route = route;
