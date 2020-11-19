import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public httpClient:HttpClient) {}

  getAllProduct():Observable<Product[]>{
    return this.httpClient.get<Product[]>("http://localhost:5000/products");
  }

  getProductByCode(code):Observable<Product>{
    return this.httpClient.get<Product>("http://localhost:5000/products/"+code);
  }

  findProductByCode(code):Promise<Product>{
    return this.httpClient.get<Product>("http://localhost:5000/products/"+code).toPromise();
  }
  
  getProductByCompany(companyName):Observable<Product[]>{
    return this.httpClient.get<Product[]>("http://localhost:5000/productsByBrand/"+companyName);
  }

  storeProduct(productRef):Observable<any>{
    return this.httpClient.post("http://localhost:5000/storeProducts",productRef);
  }

  updateProduct(productRef):Observable<any>{
    return this.httpClient.put("http://localhost:5000/updateProducts",productRef);
  }

  deleteProduct(code):Observable<any>{
    return this.httpClient.delete("http://localhost:5000/deleteProduct/"+code);
  }
}
