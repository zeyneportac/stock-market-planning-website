import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../../models/';

@Injectable({
  providedIn: 'root',
})
export class AdminSidebarItemService {
  constructor(private _router: Router) {}

  _url = this._router.routerState.snapshot.url;
  menu: Array<object> = [
    {
      title: 'Add User',
      icon: 'fa fa-user-plus',
      link: '/user/add',
    },
    {
      title: 'User List',
      icon: 'fa fa-address-book',
      link: '/users',
    },
    {
      title: 'Product List',
      icon: 'fa fa-store',
      link: '/products',
    },
    {
      title: 'Balance List',
      icon: 'fa fa-credit-card',
      link: '/balance',
    },
    {
      title: 'Order List',
      icon: 'fa fa-shopping-basket',
      link: '/order',
    },
  ];

  getChildUrlActiveState(path: string[]) {
    return path.find((x) => x == this._url.split('/')[2]) ? true : false;
  }
}
