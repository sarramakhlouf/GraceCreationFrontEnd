import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'About', component: AboutComponent},
  { path: 'Shop', component: ShopComponent},
  { path: 'Shop/:categoryId/:subCategoryId', component: ShopComponent},
  { path: 'Shop/:categoryId', component: ShopComponent},
  { path: 'Product/:id', component: ProductComponent},
  { path: 'Account', component: AccountComponent},
  { path: 'Contact', component: ContactComponent},
  { path: 'shopCart', component: ShopCartComponent},
  { path: 'search-results', component: SearchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
