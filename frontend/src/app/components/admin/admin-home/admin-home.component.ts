import { Router } from '@angular/router';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
  
  }
  logout(){
    this.userService.logout();
    this.router.navigate(['login'])
  }

}
