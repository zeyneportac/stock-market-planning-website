import { Component, OnInit, Inject } from '@angular/core';
import { Order } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, OrderService } from '../../utils';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
})
export class AddOrderComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _orderService: OrderService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _authService: AuthService
  ) {}

  _model: Order = new Order();
  _orderRenew: boolean = false;
  _action: Function;
  disableButton: boolean = false;

  async ngOnInit() {
    this._orderRenew = false;
    this._action = this.insertActionAsync;
  }

  async onSave(orderForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (orderForm.valid) {
      this._translateService
        .get('Order registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(orderForm))) return;
      this.dialogRef.close(this._orderRenew);
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
  async insertActionAsync(orderForm: NgForm) {
    try {
      this.disableButton = true;
      await this._orderService.insertAsync({
        ...orderForm.value,
        ProductID: this.data.Id,
      });
      let userValue = this._authService.currentUserValue;
      userValue.result.Balance =
        userValue.result.Balance - this.data.Price * orderForm.value.Quantity;
      localStorage.setItem('currentUser', JSON.stringify(userValue));
      orderForm.resetForm();
      this._orderRenew = true;
      return true;
    } catch (error) {
      console.log(error);
      this.disableButton = false;
      this._orderService.errorNotification(error);
      return false;
    }
  }
}
