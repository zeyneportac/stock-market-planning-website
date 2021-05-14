import { Component, OnInit, Inject } from '@angular/core';
import { Balance } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BalanceService } from '../../utils';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.scss'],
})
export class AddBalanceComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _balanceService: BalanceService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddBalanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  _model: Balance = new Balance();
  _balanceRenew: boolean = false;
  _action: Function;
  disableButton: boolean = false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this._model = this.data;
        console.log(this._model);
      } catch (error) {
        this._balanceService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._balanceRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(balanceForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (balanceForm.valid) {
      this._translateService
        .get('Balance registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(balanceForm))) return;
      this.dialogRef.close(this._balanceRenew);
    } else {
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__error';
    }

    this._snackBar.open(notification.message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: notification.panelClass,
    });
  }
  async insertActionAsync(balanceForm: NgForm) {
    try {
      this.disableButton = true;
      await this._balanceService.insertAsync(balanceForm.value);
      balanceForm.resetForm();
      this._balanceRenew = true;
      return true;
    } catch (error) {
      this.disableButton = false;
      this._balanceService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(balanceForm: NgForm) {
    try {
      await this._balanceService.updateAsync(
        Object.assign(balanceForm.value, {
          Id: this.data.Id,
        })
      );
      return true;
    } catch (error) {
      this._balanceService.errorNotification(error);
      return false;
    }
  }
}
