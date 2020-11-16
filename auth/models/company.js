var mongoose = require("mongoose");
var CompanySchema = mongoose.Schema;

var CompanySchemaRef = new CompanySchema({
    name: String, 
    details: String
});

var CompanyModel = mongoose.model("Company", CompanySchemaRef);

module.exports = CompanyModel;