import { ProductService } from './../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.css'],
})
export class AdminNewProductComponent implements OnInit {
  categorySubscription: Subscription;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  // ngOnDestroy() {
  //   // this.categorySubscription.unsubscribe();
  // }

  saveProduct(productForm: any) {
    let name = (<HTMLInputElement>productForm.elements.namedItem('name')).value;
    let price = (<HTMLInputElement>productForm.elements.namedItem('price'))
      .value;
    let productImage = (<HTMLInputElement>(
      productForm.elements.namedItem('productImage')
    )).files[0];
    console.log(productImage);
    let values = {
      name,
      price,
      productImage,
    };

    let data = new FormData();
    data.append('name', name);
    data.append('price', price);
    data.append('productImage', productImage);

    console.log(data);

    this.productService.saveProduct(data).subscribe({
      next: (product) => {
        productForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        if (error.message.includes('Auth failed')) console.log(error);
      },
    });
    console.log(values);
  }
}
