import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../utils';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _productService: ProductService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  _model: Product = new Product();
  _productRenew: boolean = false;
  _action: Function;
  disableButton: boolean = false;

  async ngOnInit() {
    if (this.data?.Id != null) {
      try {
        this._model = this.data;
        console.log(this._model);
      } catch (error) {
        this._productService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateActionAsync;
    } else {
      this._productRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(productForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (productForm.valid) {
      this._translateService
        .get('Product registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(productForm))) return;
      this.dialogRef.close(this._productRenew);
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
  async insertActionAsync(productForm: NgForm) {
    try {
      this.disableButton = true;
      await this._productService.insertAsync(productForm.value);
      productForm.resetForm();
      this._productRenew = true;
      return true;
    } catch (error) {
      this.disableButton = false;
      this._productService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(productForm: NgForm) {
    try {
      await this._productService.updateAsync(
        Object.assign(productForm.value, {
          Id: this.data.Id,
        })
      );
      return true;
    } catch (error) {
      this._productService.errorNotification(error);
      return false;
    }
  }
}
