import { Observable } from 'rxjs';
import { DocumentsViewModel } from './../../../view-models/documents.viewmodel';
import { SuppliersViewModel } from '../../../view-models/suppliers.viewmodel';
import {
  Component,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { LotsViewModel } from '../../../view-models/lots.viewmodel';
import { LotDto } from '../../../dto/configuration/lot.dto';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LotsSettingsComponent } from '../lots-settings/lots-settings.component';
import { SupplierDto } from '../../../dto/supplier.dto';
import { ProductDto } from '../../../dto/product.dto';
import { BaseComponent } from '../../components/base/base.component';
import { GetProductsLookup } from '../../../state/products/products.actions';
import { selectProductsLookup } from '../../../state/products/products.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-lots-list',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './lots-list.component.html',
  styleUrl: './lots-list.component.css',
})
export class LotsListComponent extends BaseComponent implements OnInit {
  @ViewChild('lotsGrid') lotsGrid: DnGridComponent;

  lots_title_text: string = 'Lots';
  columns: DnColumnDto[];
  lotsViewModel: LotsViewModel;
  dataSource$: Observable<LotDto[]>;
  isDialog: boolean = false;
  suppliersViewModel: SuppliersViewModel;
  suppliersDataSource$: Observable<SupplierDto[]>;
  productsDataSource$: Observable<ProductDto[]>;
  lotDocumentsColumns: DnColumnDto[];
  documentsViewModel: DocumentsViewModel;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    @Optional() private dialogRef: MatDialogRef<LotsListComponent>,
    @Optional() private viewContainerRef: ViewContainerRef,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.lotsViewModel = new LotsViewModel(this.http, this.auth);
    this.suppliersViewModel = new SuppliersViewModel(this.http, this.auth);
    this.documentsViewModel = new DocumentsViewModel(this.http, this.auth);
    this.store.dispatch(GetProductsLookup.action());
    this.productsDataSource$ = this.store.select(selectProductsLookup);
    this.suppliersDataSource$ = this.suppliersViewModel.GetLookup();

    if (data) {
      this.isDialog = true;
    }
  }

  ngOnInit() {
    this.getColumns();
    this.getData();
  }

  getData() {
    this.dataSource$ = this.lotsViewModel.GetAll();
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
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
        ReadOnly: true,
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'ProductId',
        DataType: 'string',
        Caption: 'Product',
        Lookup: {
          DataSource$: this.productsDataSource$,
          ValueExpr: 'Id',
          DisplayExpr: 'Sku',
        },
      },
      {
        DataField: 'ProdDate',
        DataType: 'datetime',
        Caption: 'Production Date',
        Format: 'dd/MM/yyyy',
      },
      {
        DataField: 'ExpDate',
        DataType: 'datetime',
        Caption: 'Expiration Date',
        Format: 'dd/MM/yyyy',
      },
      {
        DataField: 'SupplierId',
        DataType: 'string',
        Caption: 'Supplier',
        Lookup: {
          DataSource$: this.suppliersDataSource$,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'Notes',
        DataType: 'string',
        Caption: 'Notes',
      },
      {
        DataField: 'RemainingQty',
        DataType: 'number',
        Caption: 'Rem. Qty',
        ReadOnly: true,
        Icon: 'info',
        OnIconClicked: (data: any) => {
          // this.documentsViewModel.getChargeableDocumentsByLotId(data.Id).subscribe((result:any)=>{
          //   const dialogRef = this.dialog.open(ListWithFiltersComponent, {
          //     width: '60%',
          //     height: '80%',
          //     data: {
          //       Title:'Documents List',
          //       DataSource: result,
          //       Columns:this.lotDocumentsColumns,
          //     },
          //     viewContainerRef: this.viewContainerRef,
          //   });
          // })
        },
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onInsertClicked(e: any) {
    this.lotsGrid.add(e);
  }

  onRowSaving(data: any) {
    let newLot: LotDto = { ...data };
    newLot.ProdDate = new Date(data.ProdDate + 'Z').toISOString();
    newLot.ExpDate = new Date(data.ExpDate + 'Z').toISOString();

    if (!newLot.Id) {
      this.lotsViewModel.InsertDto(newLot).subscribe((result: any) => {
        next: {
          this.displayNotification('Record inserted');
          this.getData();
        }
      });
    } else {
      this.lotsViewModel.UpdateDto(newLot).subscribe((result: any) => {
        next: {
          this.displayNotification('Record updated');
          this.getData();
        }
      });
    }
  }

  onRowStopEditing(e: any) {
    this.getData();
  }

  onRowDeleting(data: any) {
    this.lotsViewModel.DeleteById(data.Id).subscribe({
      next: (result) => {
        if (result) {
          this.getData();
          this.displayNotification('Record deleted');
        }
      },
      error: (err: any) => {
        this.displayErrorAlert(err);
      },
    });
  }

  onSettingsClicked(e: any) {
    const dialogRef = this.dialog.open(LotsSettingsComponent, {
      width: '500px',
      height: '500px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
      viewContainerRef: this.viewContainerRef,
    });
  }

  onCloseClicked(e: any) {
    this.dialogRef.close();
  }
}
