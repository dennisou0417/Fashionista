var ProductModel = require("../models/product");
var mongoose = require("mongoose")

var GetProductInfo = (req, res) => {
    ProductModel.find({}, (err, data) => {
        if(err) throw err;
        res.json(data);
    }).populate('company');
}

var GetProductByCode = (req, res) => {
    var code = req.params.code;
    console.log(code);
    ProductModel.find({code:code}, (err, data) => {
        if(err) throw err;
        res.json(data);
    }).populate('company');
}

var GetProductByCompany = (req, res) => {
    var company = req.params.brand;
    ProductModel.find({company:company}, (err, data) => {
        if(err) throw err;
        res.json(data);
    }).populate('company');
}

var StoreProduct = (req, res) => {
    let product = new ProductModel({
        code: req.body.code,
        name: req.body.name,
        details: req.body.details,
        image: req.body.image,
        price: req.body.price,
        company: req.body.company
    });

    product.save((err, result) => {
        if(err){
            res.json({"msg": "Product was not stored"});
        }else{
            res.json({"msg": "Product was successfully stored"});
        }
    })
}

var UpdateProduct = (req, res) => {
    var code = req.body.code;
    var updateCode = req.body.ucode;
    var updateName = req.body.name;
    var updateDetails = req.body.name;
    var updateImage = req.body.image;
    var updatePrice = req.body.price;
    var updateCompany = req.body.company;

    if(code=="null"){
        code = null;
    }else{
        code = req.body.code;
    }

    ProductModel.updateOne({code:code}, {$set:{code:updateCode, name:updateName,
        details:updateDetails, image:updateImage, price:updatePrice, company:updateCompany}},
        (err, result) => {
            
        if(err) throw err;

        if(result.nModified > 0){
            res.json({"msg": "Record was successfully updated"});
        }else{
            res.json({"msg": "Record Didn't Updated"});
        }

    })
}

var DeleteProduct = (req, res) => {
    var deleteCode = req.params.code;
    ProductModel.deleteOne({code: deleteCode}, (err, result) => {
        if(err) throw err

        if(result.deletedCount > 0){
            res.json({"msg" : "Record deleted successfully"});
        }else{
            res.json({"msg" : "Record not present"});
        }
    })
}

module.exports = {GetProductInfo, GetProductByCode, GetProductByCompany, StoreProduct, UpdateProduct, DeleteProduct};