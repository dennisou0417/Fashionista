import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(public httpClient:HttpClient) { }

  getCompanies():Observable<Company[]>{
    return this.httpClient.get<Company[]>("http://localhost:5000/companies");
  }

  getCompanyByName(name):Observable<Company>{
    return this.httpClient.get<Company>("http://localhost:5000/companies/" + name);
  }

  storeCompany(companyRef):Observable<any>{
    return this.httpClient.post("http://localhost:5000/storeCompanies", companyRef);
  }

  updateCompany(companyRef):Observable<any>{
    return this.httpClient.put("http://localhost:5000/updateCompanies", companyRef);
  }

  deleteCompany(name):Observable<any>{
    return this.httpClient.delete("http://localhost:5000/deleteCompanies/"+ name);
  }
}