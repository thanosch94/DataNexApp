import {
  Component,
  Inject,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { DnPopupComponent } from '../../components/dn-popup/dn-popup.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ListWithFiltersComponent } from '../../list-with-filters/list-with-filters.component';
import { SalesViews } from '../../../enums/sales-views.enum';

@Component({
    selector: 'product-options',
    imports: [FontAwesomeModule],
    templateUrl: './product-options.component.html',
    styleUrl: './product-options.component.css'
})

export class ProductOptionsComponent {
  @ViewChild('productEdit') productEditComponent: any;
  faInfo: any;
  faGear: any;
  faList: any;
  faRectangleList: any;

  constructor(
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.faInfo = faInfo;
    this.faGear = faGear;
    this.faList = faList;
    this.faRectangleList = faRectangleList;
  }

  onProductDetailsClicked(e: any) {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '100%',
      height: '90%',
      data: {
        product: this.data.product,
      },
      viewContainerRef: this.viewContainerRef,
    });
    dialogRef.afterClosed().subscribe((confirm) => {});
  }

  onPendingOrdersClicked(e: any) {
    const dialogRef = this.dialog.open(ListWithFiltersComponent, {
      width: '100%',
      height: '90%',
      data: {
        product: this.data.product,
        view: SalesViews.PendingSalesOrders,
      },
      viewContainerRef: this.viewContainerRef,
    });
    dialogRef.afterClosed().subscribe((confirm) => {});
  }

  onSalesDocumentsClicked(e: any) {
    //TODO display the correct data
    const dialogRef = this.dialog.open(ListWithFiltersComponent, {
      width: '100%',
      height: '90%',
      data: {
        product: this.data.product,
        view: SalesViews.PendingSalesOrders,
      },
      viewContainerRef: this.viewContainerRef,
    });
    dialogRef.afterClosed().subscribe((confirm) => {});
  }
}
