import { map } from 'rxjs/operators';
import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/models/products';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAllProductUrl = 'http://127.0.0.1:5000/api/products';

  constructor(private http: HttpClient, private userService: UserService) {}

  // getAllProducts() {
  //   return of(this.http.get(`${this.getAllProductUrl}`));
  // }
  getAllProducts() {
    return this.http.get(`${this.getAllProductUrl}`);
    // .pipe(
    //   map((result: { count: number; products: Product[] }) => {
    //     console.log(result.products);
    //     return result.products;
    //   })
    // );
  }

  // get Products By Id

  getProductsById(id: string) {
    return this.http.get(`${this.getAllProductUrl}/${id}`).pipe(
      map((result) => {
        return <Product>result;
      })
    );
  }

  //saving Product
  saveProduct(data: any) {
    return this.http
      .post(this.getAllProductUrl, data)

      .pipe(
        map((result: { message: string; product: Product }) => {
          return <Product>result.product;
        })
      );
  }
}
