module.exports = function(app){

var CompanyController = require("../controllers/companyController");

app.get("/companies", CompanyController.GetCompanyInfo);
app.get("/companies/:name", CompanyController.GetCompanyByName);
app.post("/storeCompanies", CompanyController.StoreCompany);
app.put("/updateCompanies", CompanyController.UpdateCompany);
app.delete("/deleteCompanies/:name", CompanyController.DeleteCompany);

}