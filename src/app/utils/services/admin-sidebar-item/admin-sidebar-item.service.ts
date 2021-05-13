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
      title: 'User List',
      icon: 'fa fa-address-book',
      link: '/users',
    },
    {
      title: 'User Add',
      icon: 'fa fa-user-plus',
      link: '/user/add',
    },
    {
      title: 'Product List',
      icon: 'fa fa-shopping-basket',
      link: '/products',
    },
  ];

  getChildUrlActiveState(path: string[]) {
    return path.find((x) => x == this._url.split('/')[2]) ? true : false;
  }
}
