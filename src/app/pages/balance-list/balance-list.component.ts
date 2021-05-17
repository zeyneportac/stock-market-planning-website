import { Component, OnInit } from '@angular/core';
import { AuthService, BalanceService } from '../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogWindowComponent } from '../../components';
import { Balance, Roles } from '../../models';

@Component({
  selector: 'app-balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.scss'],
})
export class BalanceListComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _balanceService: BalanceService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog
  ) {}
  isAdmin: boolean =
    [Roles.Admin].indexOf(
      this._authService.currentUserValue?.result?.UserTypeName
    ) !== -1;

  balanceList: Array<Balance>;
  searchText: string;
  balances: Balance[];
  paginationConfig = {
    id: 'balanceList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.balanceList = <Array<Balance>>await this._balanceService.listAsync();
    } catch (error) {
      this._balanceService.errorNotification(error);
    }
  }

  async confirmAmount(balanceID) {
    try {
      await this._balanceService.confirmAmount({ Id: balanceID });
      await this.ngOnInit();
    } catch (error) {
      this._balanceService.errorNotification(error);
    }
  }
}
