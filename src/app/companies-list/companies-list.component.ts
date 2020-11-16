import { CompanyService } from './../services/company.service';
import { Component, OnInit } from '@angular/core';
import { Company } from './../models/company';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.css']
})
export class CompaniesListComponent implements OnInit {
  companies: Company[];
  company: Company;
  viewAllFlag:boolean = false;
  findFlag:boolean = false;
  showTableFlag:boolean = false;
  updateFlag:boolean = false;
  addFlag:boolean = false;
  deleteFlag:boolean = false;
  message:string="";
  constructor(public companyService:CompanyService) { }

  ngOnInit(): void {
  }

  loadAllCompanies():void{
    if(this.viewAllFlag == false){
      this.findFlag=false;
      this.updateFlag=false;
      this.addFlag=false;
      this.deleteFlag=false;
      this.viewAllFlag=true;
      this.companyService.getCompanies().subscribe(result => {
        this.companies = result;
      })
    }else{
      this.viewAllFlag = false;
    }
  }

  showFind():void{
    if(this.findFlag == false){
      this.viewAllFlag=false;
      this.updateFlag=false;
      this.addFlag=false;
      this.deleteFlag=false;
      this.findFlag=true;
      this.message="";
    }else{
      this.findFlag=false;
    }
  }

  findByName(nameRef):void{
    this.showTableFlag=true;
    this.companyService.getCompanyByName(nameRef).subscribe(result => 
      this.company = result)
  }

  showUpdate():void{
    if(this.updateFlag==false){
      this.updateFlag=true;
      this.findFlag=false;
      this.viewAllFlag=false;
      this.addFlag=false;
      this.deleteFlag=false;
      this.message="";
    }else{
      this.updateFlag=false;
    }
  }

  updateCompany(nameRef):void{
    this.companyService.updateCompany(nameRef).subscribe(result => this.message = result.msg);
  }

  showAdd():void{
    if(this.addFlag==false){
      this.updateFlag=false;
      this.findFlag=false;
      this.viewAllFlag=false;
      this.deleteFlag=false;
      this.addFlag=true;
      this.message="";
    }else{
      this.addFlag=false;
    }
  }

  addCompany(companyRef):void{
    this.companyService.storeCompany(companyRef).subscribe(result => this.message = result.msg);
  }

  showDelete():void{
    if(this.deleteFlag==false){
      this.findFlag=false;
      this.viewAllFlag=false;
      this.addFlag=false;
      this.updateFlag=false;
      this.deleteFlag=true;
      this.message="";
    }else{
      this.deleteFlag=false;
    }
  }

  deleteCompany(nameRef):void{
    this.companyService.deleteCompany(nameRef).subscribe(result => this.message = result.msg);
  }

}
