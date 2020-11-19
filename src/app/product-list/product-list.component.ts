import { AuthService } from './../auth/auth.service';
import { CompanyService } from './../services/company.service';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Company } from '../models/company';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  companies:Company[];
  products:Product[];
  product:Product;
  viewAllFlag:boolean = false;
  findFlag:boolean = false;
  showTableFlag:boolean = false;
  updateFlag:boolean = false;
  addFlag:boolean = false;
  deleteFlag = false;
  brandFlag:boolean = false;
  message:string = "";
  constructor(public productService:ProductService, public companyService:CompanyService, public auth:AuthService, private cart:CartComponent) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(data => {this.companies = data});
  }

  loadAllProducts():void{
    if(this.viewAllFlag==false){
      this.findFlag=false;
      this.updateFlag=false;
      this.addFlag=false;
      this.deleteFlag=false;
      this.viewAllFlag=true;
      this.productService.getAllProduct().subscribe(data => {this.products = data});
    }else{
      this.viewAllFlag=false;
    }
  }

  showFind():void{
    if(this.findFlag == false){
      this.viewAllFlag=false;
      this.updateFlag=false;
      this.addFlag=false;
      this.deleteFlag=false;
      this.findFlag=true;
    }else{
      this.findFlag=false;
    }
  }

  findByCode(code){
    this.showTableFlag=true;
    this.productService.getProductByCode(code).subscribe(result => 
      this.product = result)
      console.log(this.product);
  }

  showUpdate():void{
    if(this.updateFlag==false){
      this.updateFlag=true;
      this.findFlag=false;
      this.viewAllFlag=false;
      this.addFlag=false;
      this.deleteFlag=false;
      this.message="";
      this.productService.getAllProduct().subscribe(data => this.products = data);
    }else{
      this.updateFlag=false;
    }
  }

  updateProduct(productRef):void{
    if(productRef.company == ""){
      this.message = "Company Field is Empty";
    }else{
      this.productService.updateProduct(productRef).subscribe(result =>
      this.message = result.msg)
    }
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

  addProduct(productRef):void{
    this.productService.storeProduct(productRef).subscribe(result =>
      this.message = result.msg)
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

  deleteCompany(code):void{
    this.productService.deleteProduct(code).subscribe(result => this.message=result.msg);
  }

  findByCompany(companyId):void{
    this.productService.getProductByCompany(companyId).subscribe(result => this.products=result);
    console.log(companyId);
    this.viewAllFlag=true;
  }

  addToCart(code){
    this.cart.findByCode(code);
  }

}
