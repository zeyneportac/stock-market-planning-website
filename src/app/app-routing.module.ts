import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/layouts';
import {
  DashboardComponent,
  LoginComponent,
  UserListComponent,
  AddUserComponent,
  ProductListComponent,
  BalanceListComponent,
  OrderListComponent,
} from './pages';
import { Roles } from './models';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: '', icon: '' },
      },
      {
        path: 'users',
        component: UserListComponent,
        data: {
          title: 'User List',
          icon: 'fa fa-2x fa-user',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'user/add',
        component: AddUserComponent,
        data: {
          title: 'Add User',
          icon: 'fa fa-2x fa-user-plus',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'user/edit/:Id',
        component: AddUserComponent,
        data: {
          title: 'Edit User',
          icon: 'fa fa-2x fa-home',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'user/profile',
        component: AddUserComponent,
        data: { title: 'Profile', icon: 'fa fa-2x fa-user' },
      },
      {
        path: 'products',
        component: ProductListComponent,
        data: {
          title: 'Product List',
          icon: 'fa fa-2x fa-store',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'balance',
        component: BalanceListComponent,
        data: {
          title: 'Balance List',
          icon: 'fa fa-2x fa-credit-card',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'order',
        component: OrderListComponent,
        data: {
          title: 'Order List',
          icon: 'fa fa-2x fa-shopping-basket',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [];
