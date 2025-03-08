import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  // Assurez-vous d'importer BrowserModule
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from './product/product.component';
import { AccountComponent } from './account/account.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { ShopCartComponent } from './shop-cart/shop-cart.component';  // N'oubliez pas d'importer FormsModule
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SearchComponent } from './search/search.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StatusPipe } from './pipe/status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ShopComponent,
    ProductComponent,
    AccountComponent,
    ContactComponent,
    ShopCartComponent,
    SearchComponent,
    BreadcrumbComponent,
    NotFoundComponent,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
