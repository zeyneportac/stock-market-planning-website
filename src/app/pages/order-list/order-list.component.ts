import { Component, OnInit } from '@angular/core';
import { OrderService, AuthService } from '../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../components';
import { Order, Roles } from '../../models';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _orderService: OrderService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog
  ) {}

  orderList: Array<Order>;
  searchText: string;
  orders: Order[];
  paginationConfig = {
    id: 'orderList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.orderList = <Array<Order>>await this._orderService.listAsync();
    } catch (error) {
      this._orderService.errorNotification(error);
    }
  }
}
