import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { WebAppBase } from '../../../base/web-app-base';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { AsyncPipe } from '@angular/common';
import { selectAllProducts } from '../../../state/products/products.selectors';
import { BaseComponent } from '../../components/base/base.component';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import { DeleteProduct, GetAllProducts } from '../../../state/products/products.actions';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    DnToolbarComponent,
    MatTooltipModule,
    DnGridComponent,
    AsyncPipe,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent extends BaseComponent implements OnInit {
  dataSource: any;
  columns: DnColumnDto[];
  products_list_text: string;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private columnsService: ColumnsService,
  ) {
    super();
    this.products_list_text = 'Products List';
    this.tabsService.setActiveTabName(this.products_list_text);
  }

  ngOnInit() {
    this.getColumns();
    this.getData();
  }

  getData() {
    this.store.dispatch(GetAllProducts.action());
    this.dataSource = this.store.select(selectAllProducts);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.ProductsList);
  }

  onInsertClicked(e: any) {
    this.router.navigate(['product-edit']);
  }

  editProduct(e: any) {
    this.router.navigate(['product-edit'],  { state: { id: e.Id } });
  }

  deleteProduct(data: any) {
    this.store.dispatch(DeleteProduct.action(data.Id))
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  //#region Actions Results
    setActionsResults() {
      this.setPostActionsResults(
        {
          deleteSuccess: DeleteProduct.actionSuccess,
          deleteFailure: DeleteProduct.actionFailure,
        },
        {
          deleteSuccess: () => {
            this.displayNotification('Record deleted');
            this.getData()
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
