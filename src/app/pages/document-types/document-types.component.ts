import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DocumentTypeDto } from '../../dto/document-type.dto';
import { DocumentTypesViewModel } from '../../view-models/document-types.viewmodel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { AuthService } from '../../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TabsService } from '../../services/tabs.service';
import { Router } from '@angular/router';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { DocumentTypeGroupEnumList } from '../../enumLists/document-type-group.enumlist';

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

  templateUrl: './document-types.component.html',
  styleUrl: './document-types.component.css',
})
export class DocumentTypesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
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
    private router: Router,
    private ref: ChangeDetectorRef
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

    if (data.Id) {
      documentType.Id = data.Id;
    }
    documentType.Name = data.Name;
    documentType.Abbreviation = data.Abbreviation;
    documentType.DocumentTypeGroup = data.DocumentTypeGroup;
    documentType.Description = data.Description;

    if (!documentType.Id) {
      this.documentTypesViewModel
        .InsertDto(documentType)
        .subscribe((result: any) => {
          this.displayNotification('Record inserted');
          this.getData();
        });
    } else {
      this.documentTypesViewModel
        .UpdateDto(documentType)
        .subscribe((result: any) => {
          this.displayNotification('Record updated');
          this.getData();
        });
    }
  }

  onDocumentTypeDelete(data: DocumentTypeDto) {
    this.documentTypesViewModel.DeleteById(data.Id).subscribe((result: any) => {
      let index = this.documentTypesGrid.matDataSource.data.indexOf(data);
      this.documentTypesGrid.matDataSource.data.splice(index, 1);
      this.getData();
      this.documentTypesGrid.table.renderRows();
      this.displayNotification('Record deleted');
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
}
