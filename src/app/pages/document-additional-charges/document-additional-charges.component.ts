import { BaseComponent } from './../components/base/base.component';
import {
  Component,
  Inject,
  Input,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentAdditionalChargeDto } from '../../dto/document-additional-charge.dto';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { DocumentAdditionalChargesViewModel } from '../../view-models/document-additional-charges.viewmodel';
import { AuthService } from '../../services/auth.service';
import { Guid } from 'guid-typescript';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnsService } from '../../services/columns.service';
import { GridColumns } from '../../base/grid-columns';

@Component({
  selector: 'app-document-additional-charges',
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
    DnToolbarComponent,
    CommonModule,
    DnGridComponent,
  ],
  templateUrl: './document-additional-charges.component.html',
  styleUrl: './document-additional-charges.component.css',
})
export class DocumentAdditionalChargesComponent
  extends BaseComponent
  implements OnInit
{
  @ViewChild('documentAdditionalCharges')
  documentAdditionalChargesGrid: DnGridComponent;
  documentId: Guid;
  document_additionl_charges_text: string;
  dataSource: DocumentAdditionalChargeDto[];
  columns: DnColumnDto[];
  documentAdditionalChargesViewModel: DocumentAdditionalChargesViewModel;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private columnsService: ColumnsService,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    super();
    this.documentAdditionalChargesViewModel =
      new DocumentAdditionalChargesViewModel(this.http, this.auth);
     this.document_additionl_charges_text = 'Additional Charges';

    this.documentId = dialogData.DocumentId;

  }

  ngOnInit(): void {
    this.getColumns();
    this.getData();
  }

  getData() {
    if (this.documentId) {
      this.documentAdditionalChargesViewModel
        .GetByDocumentId(this.documentId)
        .subscribe((result: any) => {
          if (result) {
            this.dataSource = result;
            this.getColumns();
          }
        });
    }
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.DocumentAdditionalCharges)
  }

  onCloseBtnClicked(e: any) {}

  onDocumentAdditionalChargeRowSaving(data: any) {
    let newAdditionalCharge:DocumentAdditionalChargeDto = { ...data };

    if (!newAdditionalCharge.Id) {
      this.documentAdditionalChargesViewModel
        .InsertDto(newAdditionalCharge)
        .subscribe((result: any) => {
          this.displayNotification('Record inserted');
          this.getData();
        });
    } else {
      this.documentAdditionalChargesViewModel
        .UpdateDto(newAdditionalCharge)
        .subscribe((result: any) => {
          this.displayNotification('Record updated');
          this.getData();
        });
    }
  }

  removeAdditionalCharge(e: any) {}

  onDocumentAdditionalChargeRowStopEditing(e: any) {
    this.getData();
  }

  onDocumentAdditionalChargeRowDeleting(data: any) {
    this.documentAdditionalChargesViewModel
      .DeleteById(data.Id)
      .subscribe((result: any) => {
        let index =
          this.documentAdditionalChargesGrid.matDataSource.data.indexOf(data);
        this.documentAdditionalChargesGrid.matDataSource.data.splice(index, 1);
        this.getData();
        this.documentAdditionalChargesGrid.table.renderRows();
        this.displayNotification('Record deleted');
      });
  }

  onInsertBtnClicked(e: any) {
    this.documentAdditionalChargesGrid.add(e);
  }
}
