import { AuthService } from './../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Item[];
  product:Product;
  total: number = 0;

  constructor(private productService: ProductService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(){
    this.loadCart();
  }

  async findByCode(code){
    if(code){
      var item:Item ={
        product : await this.productService.findProductByCode(code),
        quantity: 1
      };

      if(localStorage.getItem('cart') == null){
        let cart: any = [];
        cart.push(JSON.stringify(item));
        console.log(cart)
        localStorage.setItem('cart', JSON.stringify(cart));
      }else{
        let cart: any = JSON.parse(localStorage.getItem('cart'));
        let index: number = -1;
        for(var i = 0; i < cart.length; i++){
          let item: Item = JSON.parse(cart[i]);
          if(item.product[0].code == code){
            index = i;
            break;
          }
        }
        if(index == -1){
          cart.push(JSON.stringify(item));
          localStorage.setItem('cart',JSON.stringify(cart));
        }else{
          let item: Item = JSON.parse(cart[index]);
          item.quantity += 1;
          cart[index] = JSON.stringify(item);
          localStorage.setItem("cart",JSON.stringify(cart));
        }
      }
      this.loadCart();
    }else{
      this.loadCart();
    }
  }

  loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product[0].price * item.quantity;
		}
  }
  
  remove(code: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product[0].code == code) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
  }
  
	cartInfo:any;
	checkOut() {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		this.cartInfo= cart;
		console.log(cart);
  }
  

}
