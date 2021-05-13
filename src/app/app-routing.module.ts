import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/layouts';
import { DashboardComponent, LoginComponent, UserListComponent } from './pages';
import { Roles } from './models';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Dashboard', icon: 'fa fa-2x fa-home' },
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
