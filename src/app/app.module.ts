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
