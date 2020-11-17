module.exports = function(app){

    var ProductController = require("../controllers/productController");
    
    app.get("/products", ProductController.GetProductInfo);
    app.get("/products/:code", ProductController.GetProductByCode);
    app.get("/productsByBrand/:brand", ProductController.GetProductByCompany);
    app.post("/storeProducts", ProductController.StoreProduct);
    app.put("/updateProducts", ProductController.UpdateProduct);
    app.delete("/deleteProduct/:code", ProductController.DeleteProduct);
    
    }