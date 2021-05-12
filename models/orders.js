let mongoose = require('mongoose');

let orderSchema = {
    items: [],
    cost: [],
    streetAddress: String,
    city: String,
    state: String,
    zipCode: String,
    deliveryInst: String
};