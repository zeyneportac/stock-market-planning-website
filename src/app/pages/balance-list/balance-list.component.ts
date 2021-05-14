import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddBalanceComponent, DialogWindowComponent } from '../../components';
import { Balance } from '../../models';

@Component({
  selector: 'app-balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.scss'],
})
export class BalanceListComponent implements OnInit {
  constructor(
    private _balanceService: BalanceService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog
  ) {}

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
  openAddBalance(Id = null) {
    const diologRef = this._dialog.open(AddBalanceComponent, {
      width: '400px',
      data:
        Id == null
          ? null
          : this.balanceList.find((balance) => balance.Id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }
  async balanceDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the balance ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._balanceService.deleteAsync({ Id });
          this.balanceList.splice(
            this.balanceList.findIndex((balance) => balance.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Balance information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));
          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._balanceService.errorNotification(error);
        }
      }
    });
  }
}
