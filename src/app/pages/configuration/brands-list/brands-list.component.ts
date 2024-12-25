import { Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandsViewModel } from '../../../view-models/brands.viewmodel';
import { BrandDto } from '../../../dto/brand.dto';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { Store } from '@ngrx/store';
import {
  DeleteBrandById,
  DeleteBrandByIdFailure,
  DeleteBrandByIdSuccess,
  GetAllBrands,
  InsertBrandDto,
  InsertBrandDtoSuccess,
  UpdateBrandDto,
  UpdateBrandDtoSuccess,
} from '../../../state/parameters/brands/brands.actions';
import { selectAllBrands } from '../../../state/parameters/brands/brands.selectors';
import { AsyncPipe } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-brands-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.css',
})
export class BrandsListComponent implements OnInit {
  @ViewChild('brandsGrid') brandsGrid: DnGridComponent;
  columns: any[];
  dataSource: Observable<BrandDto[]>;
  product_brands_list_text: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private store: Store,
    private actions$: Actions
  ) {
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
      .pipe(ofType(InsertBrandDtoSuccess))
      .subscribe((result: any) => {
        this._snackBar.open('Record inserted', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
        this.getData();
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(UpdateBrandDtoSuccess))
      .subscribe((result: any) => {
        this.getData();
        this._snackBar.open('Record updated', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteBrandByIdSuccess))
      .subscribe((result: any) => {
        this.getData();

        this._snackBar.open('Record deleted', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteBrandByIdFailure))
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
    this.store.dispatch(GetAllBrands());
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
    this.store.dispatch(DeleteBrandById({ id: data.Id }));
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
      this.store.dispatch(InsertBrandDto({ dto: brand }));
    } else {
      this.store.dispatch(UpdateBrandDto({ dto: brand }));
    }
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onRowStopEditing(e: any) {
    this.getData();
  }
}
