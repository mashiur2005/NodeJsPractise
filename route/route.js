function route(pathname, handle, response, queryObject) {
    console.log("About a route a request for " + pathname);

    if (typeof handle[pathname] === "function") {
        try {
            handle[pathname](response, queryObject);
        } catch (Error) {
            throw Error;
        }
    } else {
        console.log("No request Handler found for the path " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 not found");
        response.end();
    }
}

exports.route = route;
