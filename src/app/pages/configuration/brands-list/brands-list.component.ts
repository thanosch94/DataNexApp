import { Observable, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BrandDto } from '../../../dto/brand.dto';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import {
  DeleteBrand,
  GetAllBrands,
  InsertBrand,
  UpdateBrand,
} from '../../../state/parameters/brands/brands.actions';
import { selectAllBrands } from '../../../state/parameters/brands/brands.selectors';
import { AsyncPipe } from '@angular/common';
import { BaseComponent } from '../../components/base/base.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';

@Component({
  selector: 'app-brands-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.css',
})
export class BrandsListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('brandsGrid') brandsGrid: DnGridComponent;
  columns: DnColumnDto[];
  dataSource: Observable<BrandDto[]>;
  product_brands_list_text: string;
  private destroy$ = new Subject<void>();

  constructor(
    private columnsService: ColumnsService
  ) {
    super();
    this.product_brands_list_text = 'Product Brands List';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
  }

  getData() {
    this.store.dispatch(GetAllBrands.action());
    this.dataSource = this.store.select(selectAllBrands);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.Brands);
  }

  onRowDelete(data: any) {
    this.store.dispatch(DeleteBrand.action({ id: data.Id }));
  }

  onInsertClicked(e: any) {
    this.brandsGrid.add(e);
  }

  onRowSaving(data: any) {
    let dto: BrandDto = { ...data };

    if (!dto.Id) {
      this.store.dispatch(InsertBrand.action({ dto }));
    } else {
      this.store.dispatch(UpdateBrand.action({ dto }));
    }
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onRowStopEditing(e: any) {
    this.getData();
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertBrand.actionSuccess,
        insertFailure: InsertBrand.actionFailure,
        updateSuccess: UpdateBrand.actionSuccess,
        updateFailure: UpdateBrand.actionFailure,
        deleteSuccess: DeleteBrand.actionSuccess,
        deleteFailure: DeleteBrand.actionFailure,
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
