import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSearchFilterModule } from 'ng-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatModule } from './utils';
import {
  AdminSidebarComponent,
  AdminControlSidebarComponent,
  AdminFooterComponent,
  AdminLayoutComponent,
  AdminHeaderComponent,
} from './components/layouts';
import { DialogWindowComponent, PaginationComponent } from './components';
import { DashboardComponent, LoginComponent } from './pages';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { PasswordControlWindowComponent } from './components/password-control-window/password-control-window.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { BalanceListComponent } from './pages/balance-list/balance-list.component';
import { AddBalanceComponent } from './components/add-balance/add-balance.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AdminLayoutComponent,
    DashboardComponent,
    AdminFooterComponent,
    AdminControlSidebarComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    LoginComponent,
    DialogWindowComponent,
    PaginationComponent,
    UserListComponent,
    AddUserComponent,
    PasswordControlWindowComponent,
    ProductListComponent,
    AddProductComponent,
    BalanceListComponent,
    AddBalanceComponent,
    OrderListComponent,
    AddOrderComponent,
    PasswordChangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    NgSearchFilterModule,
    NgxPaginationModule,
    FormsModule,
    MatSnackBarModule,
    MatModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
