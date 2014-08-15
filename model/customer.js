function Customer(dataObject) {
    this.name = dataObject.name || '';
    this.address = dataObject.address || '';
    this.email = dataObject.email || '';
    this.phone = dataObject.phone || '';
}

Customer.prototype.getCustomer = function() {
    return {
        name : this.name,
        address : this.address,
        email : this.email,
        phone : this.phone
    };
}

exports.Customer = Customer;