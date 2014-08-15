function CustomerRenderComponents(response, data, ejs) {
    this.response = response;
    this.data = data;
    this.ejs = ejs;
}

CustomerRenderComponents.prototype.getResponse = function() {
    return this.response;
}

CustomerRenderComponents.prototype.getData = function () {
    return this.data;
}

CustomerRenderComponents.prototype.getEJS = function () {
    return this.ejs;
}

exports.CustomerRenderComponents = CustomerRenderComponents;
