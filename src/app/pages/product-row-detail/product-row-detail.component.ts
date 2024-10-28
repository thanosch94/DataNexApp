import { LotsViewModel } from './../../view-models/lots.viewmodel';
import { DnToolbarComponent } from './../components/dn-toolbar/dn-toolbar.component';
import {
  Component,
  Inject,
  OnInit,
  Optional,
  ViewContainerRef,
} from '@angular/core';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { LotDto } from '../../dto/configuration/lot.dto';
import { LotsListComponent } from '../configuration/lots/lots-list.component';
import { LotSettingsViewModel } from '../../view-models/lot-settings.viewmodel';
import { LotSettingsDto } from '../../dto/configuration/lot-settings.dto';
import { DocumentTypeGroupEnum } from '../../enums/document-type-group.enum';
import { LotStrategyEnum } from '../../enums/lot-strategy.enum';
import { DocumentProductDto } from '../../dto/document-product.dto';

@Component({
  selector: 'app-product-row-detail',
  standalone: true,
  imports: [
    DnToolbarComponent,
    MatTabsModule,
    MatTabGroup,
    DnGridComponent,
    MatDialogModule,
  ],
  templateUrl: './product-row-detail.component.html',
  styleUrl: './product-row-detail.component.css',
})
export class ProductRowDetailComponent implements OnInit {
  product_row_detail_text: string = 'Details';
  rowData: any;
  lotsQuantitiesDataSource: any[] = [];
  lotsQuantitiesColumns: DnColumnDto[];
  lotsViewModel: LotsViewModel;
  lotsDataSource: LotDto[];
  areLotsEnabled: boolean;
  documentGroup: any;
  supplierIdSelected: any;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private dialogRef: MatDialogRef<ProductRowDetailComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.lotsViewModel = new LotsViewModel(this.http, this.auth);
    if(data){
      this.rowData = data?.Row as DocumentProductDto;
      debugger
      this.supplierIdSelected =data.Supplier
      this.documentGroup= data.DocumentGroup

    }
    this.getLots()

    if (this.rowData.DocumentProductLotsQuantities) {
      this.lotsQuantitiesDataSource =
        this.rowData.DocumentProductLotsQuantities;
    }
    this.areLotsEnabled = this.auth.appOptions.LotsEnabled;

    this.getLotsQuantitiesColumns();

  }

  ngOnInit(): void {


  }

  getLotsQuantitiesColumns() {
    this.lotsQuantitiesColumns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },

      {
        DataField: 'LotId',
        DataType: 'string',
        Caption: 'Lot',
        Lookup: {
          DataSource: this.lotsDataSource,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
        //Cannot add new lot from Sales. Add is available only from purchasing because then adds qty as well
        Icon: this.documentGroup==DocumentTypeGroupEnum.Purchasing?'add_circle':'',
        IconTooltip:'Add New Lot',
        OnIconClicked: () => {
          const dialogRef = this.dialog.open(LotsListComponent, {
            disableClose: true,
            width: '800px',
            height: '500px',
            data: {isDialog:true},
            viewContainerRef: this.viewContainerRef,
          });
          dialogRef.afterClosed().subscribe((data: any) => {
            this.getLots()
          });
        },
      },
      {
        DataField: 'Quantity',
        DataType: 'number',
        Caption: 'Quantity',
        Min:1
      },

      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  getLots(){
    if(this.documentGroup==DocumentTypeGroupEnum.Purchasing && this.supplierIdSelected){
      this.lotsViewModel.GetLookupBySupplierIdAndProductId(this.supplierIdSelected, this.rowData.ProductId).subscribe((result: LotDto[]) => {
        this.lotsDataSource = result;
        this.getLotsQuantitiesColumns();
      });
    }else if(this.documentGroup==DocumentTypeGroupEnum.Sales){
      this.lotsViewModel.GetLookupByProductIdWithRemainingQty(this.rowData.ProductId).subscribe((result: LotDto[]) => {
        this.lotsDataSource = result;
        this.getLotsQuantitiesColumns();
      });
    }

  }
  onCloseBtnClicked(e: any) {
    this.dialogRef.close(this.lotsQuantitiesDataSource);
  }
}
