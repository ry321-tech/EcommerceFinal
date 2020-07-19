import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {

  error: string
  success: string

  constructor(private userService : UserService, private router : Router ) { }

  ngOnInit(): void {
  }
   
  navigateTOLoginPage(){
    this.router.navigate(['login'])
  }
   
  readValuesFromFrom(form: HTMLFormElement){
    
    let name = (<HTMLInputElement>form.elements.namedItem('name')).value
    let email = (<HTMLInputElement>form.elements.namedItem('email')).value
    let password = (<HTMLInputElement>form.elements.namedItem('password')).value
    let phone = (<HTMLInputElement>form.elements.namedItem('phone')).value
    
    let user : User  = {
      name,
      email,
      password,
      phone
   
    };
    
     return user
   
  }

  signup(event : Event){
    event.preventDefault();
    let form = <HTMLFormElement>event.target;
   let user = this.readValuesFromFrom(form)
   this.createUser(user, form)
    
  
  }

  createUser(user : User, form : HTMLFormElement){
    this.userService.signup(user).subscribe(
      {
        next : (result)=>{
          console.log(result)
          this.success = result.message
          this.error = undefined
          form.reset();
          this.navigateTOLoginPage();

        },
        error : (responce: HttpErrorResponse)=>{
           console.log(responce);
           this.error = responce.error.error.message
           this.success = undefined
           
        }
      }
    )
  }

}
