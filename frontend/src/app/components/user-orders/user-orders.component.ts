import { OrderService } from './../../services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.collectOrders();
  }

  collectOrders() {
    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        //  console.log(orders);
        this.orders = orders;
      },
    });
  }
}
