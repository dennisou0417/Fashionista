import { AuthService } from './../auth/auth.service';
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
  loggedOut:boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, public auth:AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const key1 = 'loggedin';
      if (params[key1] === 'success') {
        this.loggedIn = true;
        this.loggedOut = false;
        this.notify = 'You have been successfully logged in. Welcome home';
      }
    });
  }

  
  

}
