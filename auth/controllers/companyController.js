var CompanyModel = require("../models/company");

var GetCompanyInfo = (req, res) => {
    CompanyModel.find({},(err,data)=> {
        if(err) throw err;
        res.json(data);
    })
}

var GetCompanyByName = (req, res) => {
    var name = req.params.name;
    CompanyModel.find({name:name}, (err,data) => {
        if(err) throw err;
        res.json(data);
    })
}

var StoreCompany = (req, res) => {
    let company = new CompanyModel({
        name:req.body.name,
        details:req.body.details
    });

    company.save((err,result) => {
        if(err){
            res.json({"msg":"Company was not stored"});
        }else{
            res.json({"msg":"Record was Successfully Stored"});
        }
    })
}

var UpdateCompany = (req, res) => {
    var updateId = req.body._id;
    var updateName = req.body.name;
    var updateDetails = req.body.details;
    CompanyModel.updateOne({_id:updateId},{$set:{name:updateName,details:updateDetails}}, (err, result) => {
        if(err) throw err;

        if(result.nModified > 0){
            res.json({"msg":"Record was successfully updated"});
        }else{
            res.json({"msg":"Record Didn't Update"});
        }
    })
}

var DeleteCompany = (req, res) => {
    var deleteName = req.params.name;
    CompanyModel.deleteOne({name:deleteName}, (err, result) => {
        if(err) throw err
        
        if(result.deletedCount > 0){
            res.json({"msg":"Record deleted successfully!"});
        }else{
            res.json({"msg":"Record not present"});
        }
    })
}

module.exports = {GetCompanyInfo, GetCompanyByName, StoreCompany, UpdateCompany, DeleteCompany};