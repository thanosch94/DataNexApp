import { DocTypeAffectBehaviorEnum } from '../../../enums/doc-type-affect-behavior.enum';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { DocumentTypeDto } from '../../../dto/document-type.dto';
import { DocumentTypeGroupEnumList } from '../../../enumLists/document-type-group.enumlist';
import { AuthService } from '../../../services/auth.service';
import { TabsService } from '../../../services/tabs.service';
import { DocumentTypesViewModel } from '../../../view-models/document-types.viewmodel';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DocTypeAffectBehaviorEnumList } from '../../../enumLists/doc-type-affect-behavior.enumList';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-types',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    HttpClientModule,
    MatSortHeader,
    DnToolbarComponent,
    MatTooltipModule,
    DnGridComponent,
    FontAwesomeModule,
  ],

  templateUrl: './document-types-list.component.html',
  styleUrl: './document-types-list.component.css',
})
export class DocumentTypesListComponent implements OnInit {

  @ViewChild('documentTypesGrid')
  documentTypesGrid: DnGridComponent;
  documentTypesDataSource: any;
  documentType: any;
  documentTypesViewModel: DocumentTypesViewModel;
  document_types_list_title_text: string;
  documentTypesColumns: DnColumnDto[] = [];
  chartOptions: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private tabsService: TabsService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router:Router
  ) {
    this.documentTypesViewModel = new DocumentTypesViewModel(
      this.http,
      this.auth
    );

    this.document_types_list_title_text = 'Document Types List';
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.documentTypesViewModel.GetAll().subscribe((result: any) => {
      this.documentTypesDataSource = result;
    });
  }
  getColumns() {
    this.documentTypesColumns = [
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
        DataField: 'Abbreviation',
        DataType: 'string',
        Caption: 'Abbreviation',
      },
      {
        DataField: 'DocumentTypeGroup',
        DataType: 'number',
        Caption: 'Document Type Group',
        Lookup: {
          DataSource: DocumentTypeGroupEnumList.value,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'Decription',
        DataType: 'string',
        Caption: 'Decription',
        Visible: false,
      },
      {
        DataField: 'PersonBalanceAffectBehavior',
        DataType: 'string',
        Caption: 'Affects Balance',
        Visible: true,
        Lookup:{
          DataSource:DocTypeAffectBehaviorEnumList.value,
          ValueExpr:'Id',
          DisplayExpr:'Name'
        }
      },
      {
        DataField: 'WareHouseAffectBehavior',
        DataType: 'string',
        Caption: 'Affects Warehouse',
        Visible: true,
        Lookup:{
          DataSource:DocTypeAffectBehaviorEnumList.value,
          ValueExpr:'Id',
          DisplayExpr:'Name'
        }
      },
      {
        DataField: 'IsActive',
        DataType: 'boolean',
        Caption: 'Is Active',
        Visible: true,
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  onInsertClicked(e: any) {
    this.documentTypesGrid.add(e);
  }

  onDocumentTypeSaving(data: DocumentTypeDto) {
    let documentType = new DocumentTypeDto();
    let that=this
    if (data.Id) {
      documentType.Id = data.Id;
    }
    documentType.Name = data.Name;
    documentType.Abbreviation = data.Abbreviation;
    documentType.DocumentTypeGroup = data.DocumentTypeGroup;
    documentType.Description = data.Description;
    documentType.IsActive = data.IsActive;
    documentType.PersonBalanceAffectBehavior = data.PersonBalanceAffectBehavior;
    documentType.WareHouseAffectBehavior = data.WareHouseAffectBehavior;

    if (!documentType.Id) {
      this.documentTypesViewModel
        .InsertDto(documentType)
        .subscribe((result: any) => {
          this.displayNotification('Record inserted');
          this.getData();
        });
    } else {
      if (data.Id)
        this.documentTypesViewModel.UpdateDto(documentType).subscribe({
          next: (result: any) => {
            this.displayNotification('Record updated');
            this.getData();
          },
          error:(err:any)=>{
            const dialog = this.dialog.open(DnAlertComponent, {
              data: {
                Title: 'Message',
                Message: err.error,
              },

            });
            that.getData()
          }
        });

    }
  }

  onDocumentTypeDelete(data: DocumentTypeDto) {
    this.documentTypesViewModel.DeleteById(data.Id).subscribe({
      next: (result: any) => {
        let index = this.documentTypesGrid.matDataSource.data.indexOf(data);
        this.documentTypesGrid.matDataSource.data.splice(index, 1);
        this.getData();
        this.documentTypesGrid.table.renderRows();
        this.displayNotification('Record deleted');
      },
      error: (err: any) => {
        const dialog = this.dialog.open(DnAlertComponent, {
          data: {
            Title: 'Message',
            Message: err.error,
          },
        });
      },
    });
  }

  onDocumentTypesStopEditing(e: any) {
    this.getData();
  }

  displayNotification(text: string) {
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
  }

  onRefreshClicked(e: any) {
    this.getData();
    this.documentTypesGrid.renderRows();
  }

  onRowEditing(e:any){
    this.router.navigate(['document-type-edit'],{ queryParams: {id:e.Id} })
  }
}
