import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/products';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  products: any;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        // console.log(products);
        // return products;
        this.products = products;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
