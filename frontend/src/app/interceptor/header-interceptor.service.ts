import { map, catchError } from 'rxjs/operators';
import { UserService } from './../services/user/user.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let header = req.headers.set('authorization', this.userService.getToken());
    let r = req.clone({
      headers: header,
    });
    // console.log(r);
    return next.handle(r).pipe(
      map((result) => {
        // console.log(result);
        return result;
      }),
      catchError((err) => {
        console.log(err);
        return throwError(err);
      })
    );
  }
}
