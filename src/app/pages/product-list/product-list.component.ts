import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  AddProductComponent,
  DialogWindowComponent,
  AddOrderComponent,
} from '../../components';
import { Order, Product } from '../../models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private _productService: ProductService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog
  ) {}
  orderList: Array<Order>;
  productList: Array<Product>;
  searchText: string;
  products: Product[];
  paginationConfig = {
    id: 'productList',
    itemsPerPage: 10,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.productList = <Array<Product>>await this._productService.listAsync();
    } catch (error) {
      this._productService.errorNotification(error);
    }
  }
  openAddOrder(Id) {
    const diologRef = this._dialog.open(AddOrderComponent, {
      width: '400px',
      data: this.productList.find((product) => product.Id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      this.ngOnInit();
    });
  }
  openAddProduct(Id = null) {
    const diologRef = this._dialog.open(AddProductComponent, {
      width: '400px',
      data:
        Id == null
          ? null
          : this.productList.find((product) => product.Id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }
  async productDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the product ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._productService.deleteAsync({ Id });
          this.productList.splice(
            this.productList.findIndex((product) => product.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Product information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));
          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._productService.errorNotification(error);
        }
      }
    });
  }

  async productConfirm(Id) {
    try {
      await this._productService.updateAsync({ Id, ProductState: true });
      await this.ngOnInit();
    } catch (error) {
      this._productService.errorNotification(error);
    }
  }
}
