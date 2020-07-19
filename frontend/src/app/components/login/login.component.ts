import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: HTMLFormElement;
  error: string;
  success: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}
  login(event: Event) {
    event.preventDefault();
    this.form = <HTMLFormElement>event.target;
    this.readFormValues();
  }

  navigateToHomePage() {
    this.router.navigate(['']);
  }

  readFormValues() {
    let email = (<HTMLInputElement>this.form.elements.namedItem('email')).value;
    let password = (<HTMLInputElement>this.form.elements.namedItem('password'))
      .value;

    let creadentials = {
      email,
      password,
    };

    // console.log(creadentials);
    this.userService.login(creadentials).subscribe({
      next: (result) => {
        //  console.log(result);
        this.success = result.message;
        this.error = undefined;
        this.navigateToHomePage();
      },
      error: (responce: HttpErrorResponse) => {
        // console.log(responce.error)
        this.success = undefined;
        this.error = responce.error.error.message;
      },
    });
  }
}
