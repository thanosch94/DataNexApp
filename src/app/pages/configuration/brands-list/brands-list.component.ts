import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandDto } from '../../../dto/brand.dto';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { Store } from '@ngrx/store';
import {
  DeleteBrand,
  GetAllBrands,
  InsertBrand,
  UpdateBrand,
} from '../../../state/parameters/brands/brands.actions';
import { selectAllBrands } from '../../../state/parameters/brands/brands.selectors';
import { AsyncPipe } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '../../components/base/base.component';

@Component({
  selector: 'app-brands-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.css',
})
export class BrandsListComponent extends BaseComponent implements OnInit {
  @ViewChild('brandsGrid') brandsGrid: DnGridComponent;
  columns: any[];
  dataSource: Observable<BrandDto[]>;
  product_brands_list_text: string;

  constructor(
    private actions$: Actions
  ) {
    super()
    this.product_brands_list_text = 'Product Brands List';
  }
  ngOnInit() {
    this.setActionsResults()
    this.getData();
    this.getColumns();
  }

  setActionsResults(){
    this.setInsertDtoSuccessActionResult();
    this.setUpdateDtoSuccessActionResult();
    this.setDeleteByIdSuccessActionResult();
    this.setDeleteByIdFailureActionResult();
  }

  setInsertDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(InsertBrand.actionSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record inserted')
        this.getData();
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(UpdateBrand.actionSuccess))
      .subscribe((result: any) => {
        this.getData();
        this.displayNotification('Record updated')
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteBrand.actionSuccess))
      .subscribe((result: any) => {
        this.getData();
        this.displayNotification('Record deleted')
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteBrand.actionFailure))
      .subscribe((result: any) => {
        const dialog = this.dialog.open(DnAlertComponent, {
          data: {
            Title: 'Message',
            Message: result.error.error.innerExceptionMessage,
          },
        });
      });
  }

  getData() {
    this.store.dispatch(GetAllBrands.action());
    this.dataSource = this.store.select(selectAllBrands);
  }

  getColumns() {
    this.columns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  onRowDelete(data: any) {
    this.store.dispatch(DeleteBrand.action({ id: data.Id }));
  }

  onInsertClicked(e: any) {
    this.brandsGrid.add(e);
  }

  onRowSaving(data: any) {
    let brand = new BrandDto();
    if (data.Id) {
      brand.Id = data.Id;
    }
    brand.Name = data.Name;

    if (!brand.Id) {
      this.store.dispatch(InsertBrand.action({ dto: brand }));
    } else {
      this.store.dispatch(UpdateBrand.action({ dto: brand }));
    }
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onRowStopEditing(e: any) {
    this.getData();
  }
}
