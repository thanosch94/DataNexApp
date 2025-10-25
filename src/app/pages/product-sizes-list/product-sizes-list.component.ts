import { ColumnsService } from './../../services/columns.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductSizeDto } from '../../dto/product-size.dto';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { BaseComponent } from '../components/base/base.component';
import {
  DeleteProductSize,
  GetAllProductSizes,
  InsertProductSize,
  UpdateProductSize,
} from '../../state/parameters/product-sizes/product-sizes.actions';
import { selectAllProductSizes } from '../../state/parameters/product-sizes/product-sizes.selectors';
import { AsyncPipe } from '@angular/common';
import { GridColumns } from '../../base/grid-columns';

@Component({
  selector: 'app-product-sizes-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './product-sizes-list.component.html',
  styleUrl: './product-sizes-list.component.css',
})
export class ProductSizesListComponent extends BaseComponent implements OnInit {
  @ViewChild('productSizesGrid') productSizesGrid: DnGridComponent;

  columns: any[];
  dataSource$: Observable<ProductSizeDto[]>;
  productSize: ProductSizeDto = new ProductSizeDto();
  product_sizes_list_text: string;
  private destroy$ = new Subject<void>();

  constructor(private columnsService:ColumnsService) {
    super();
    this.product_sizes_list_text = 'Product Sizes List';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
  }

  getData() {
    this.store.dispatch(GetAllProductSizes.action());
    this.dataSource$ = this.store.select(selectAllProductSizes);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.ProductSizesList)
  }

  deleteProductSize(data: any) {
    this.store.dispatch(DeleteProductSize.action(data.Id));
  }

  onRowSaving(data: ProductSizeDto) {
    let dto: ProductSizeDto = { ...data };

    if (!dto.Id) {
      this.store.dispatch(InsertProductSize.action({ dto }));
    } else {
      this.store.dispatch(UpdateProductSize.action({ dto }));
    }
  }

  onInsertClicked(e: any) {
    this.productSizesGrid.add(e);
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertProductSize.actionSuccess,
        insertFailure: InsertProductSize.actionFailure,
        updateSuccess: UpdateProductSize.actionSuccess,
        updateFailure: UpdateProductSize.actionFailure,
        deleteSuccess: DeleteProductSize.actionSuccess,
        deleteFailure: DeleteProductSize.actionFailure,
      },
      {
        insertSuccess: () => {
          this.displayNotification('Record inserted');
          this.getData();
        },
        insertFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateSuccess: () => {
          this.displayNotification('Record updated');
          this.getData();
        },
        updateFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        deleteSuccess: () => {
          this.displayNotification('Record deleted');
          this.getData();
        },
        deleteFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
      },
      this.destroy$
    );
  }
  //#endregion

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
