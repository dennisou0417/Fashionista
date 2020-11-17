import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notify: string;
  loggedIn: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';
      if (params[key1] === 'success') {
        this.showOptions();
        this.notify = 'You have been successfully logged in. Welcome home';
      }
    });
  }

  showOptions():void{
    if(this.loggedIn == false){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
  }

}
