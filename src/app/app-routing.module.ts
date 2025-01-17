import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { OrderComponent } from './order/order.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'About', component: AboutComponent},
  { path: 'Shop', component: ShopComponent},
  { path: 'Product', component: ProductComponent},
  { path: 'Account', component: AccountComponent},
  { path: 'Contact', component: ContactComponent},
  { path: 'Order', component: OrderComponent},
  { path: 'shopCart', component: ShopCartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
