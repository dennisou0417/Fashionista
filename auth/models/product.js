var mongoose = require("mongoose"), Schema = mongoose.Schema;
var Company = require("../models/company");
var ProductSchema = mongoose.Schema;

var ProductSchemaRef = new ProductSchema({
    code: String, 
    name: String, 
    details: String, 
    image: String, 
    price: Number,
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'}
});

var ProductModel = mongoose.model("Product", ProductSchemaRef);

module.exports = ProductModel;