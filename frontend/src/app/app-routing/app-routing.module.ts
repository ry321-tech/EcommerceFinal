import { AdminAddUserComponent } from './../components/admin/admin-add-user/admin-add-user.component';
import { UserAuthGuardService } from './../auth-guard/user-auth-guard.service';
import { AdminNewProductComponent } from './../components/admin/admin-new-product/admin-new-product.component';
import { AdminHomeComponent } from './../components/admin/admin-home/admin-home.component';
import { LoginComponent } from './../components/login/login.component';
import { CartComponent } from './../components/cart/cart.component';
import { UserOrdersComponent } from './../components/user-orders/user-orders.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './../components/home/home.component';

const routes: Routes = [
  {path: '',canActivate : [UserAuthGuardService]  ,component: HomeComponent},
  {path: 'home',canActivate : [UserAuthGuardService] , component: HomeComponent},
  {path: 'orders',canActivate : [UserAuthGuardService] , component: UserOrdersComponent},
  {path: 'cart',canActivate : [UserAuthGuardService] , component: CartComponent},
  {path: 'login', component: LoginComponent},

  {path : 'admin', component : AdminHomeComponent , 
  canActivate : [UserAuthGuardService] ,
  children : [
    {path : 'new-product', component : AdminNewProductComponent},
    {path : 'add-user', component : AdminAddUserComponent},
    
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
