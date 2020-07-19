import { Router } from '@angular/router';
import {
  OrderInfo,
  ProductInfo,
  OrderService,
} from './../../services/order/order.service';
import { map } from 'rxjs/operators';
import { ProductService } from './../../services/product/product.service';
import { Product } from 'src/app/models/products';
import { CartService } from './../../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart;
  total = 0;
  cartItems: CartItem[] = [];
  cartSubscription: Subscription;
  modalRef: BsModalRef;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.subcribeCart();
  }
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  subcribeCart() {
    let total = 0;
    this.cartSubscription = this.cartService.cartObservable.subscribe({
      next: (cart) => {
        let observable = [];
        total = 0;
        if (Object.keys(cart).length == 0) {
          this.cartItems = [];
        }
        for (let id in cart) {
          // console.log(id);
          observable.push(
            this.productService.getProductsById(id).pipe(
              map((product) => {
                total += product.price * cart[id];
                let item: CartItem = {
                  product: product,
                  quantity: cart[id],
                };
                return item;
              })
            )
          );
        }

        forkJoin(observable).subscribe({
          next: (cartItems: CartItem[]) => {
            this.total = total;
            this.cartItems = cartItems;
          },
        });
      },
    });
  }
  //open model
  openModel(form) {
    this.modalRef = this.modalService.show(form, {
      animated: true,
      class: 'modal-lg',
    });
  }

  //check out

  checkOut(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    let firstName = (<HTMLInputElement>form.elements.namedItem('firstName'))
      .value;
    let lastName = (<HTMLInputElement>form.elements.namedItem('lastName'))
      .value;
    let address = (<HTMLInputElement>form.elements.namedItem('address')).value;

    let orderInfo: OrderInfo;
    let productInfos: ProductInfo[] = [];
    this.cartItems.forEach((e) => {
      productInfos.push({
        price: e.product.price,
        productId: e.product._id,
        quantity: e.quantity,
      });
    });

    orderInfo = {
      address,
      firstName,
      lastName,
      products: productInfos,
    };
    console.log({
      orderInfo,
    });

    this.orderService.placeOrder(orderInfo).subscribe({
      next: (result) => {
        this.modalRef.hide();
        this.cartService.clearCart();
        this.router.navigate(['orders']);
      },
      error: (err) => {
        console.log({ err: 'cant place order...' });
      },
    });
    return false;
  }
}
