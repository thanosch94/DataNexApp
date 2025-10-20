import { Observable, Subject } from 'rxjs';
import { BaseComponent } from './../components/base/base.component';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { Guid } from 'guid-typescript';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnsService } from '../../services/columns.service';
import { GridColumns } from '../../base/grid-columns';
import {
  DeleteDocumentAdditionalCharge,
  GetDocumentAdditionalChargesByDocumentId,
  InsertDocumentAdditionalCharge,
  UpdateDocumentAdditionalCharge,
} from '../../state/document-additional-charges/document-additional-charges.actions';
import { selectDocumentAdditionalChargesByDocumentId } from '../../state/document-additional-charges/document-additional-charges.selectors';

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
  dataSource$: Observable<DocumentAdditionalChargeDto[]>;
  columns: DnColumnDto[];
  private destroy$ = new Subject<void>();

  constructor(
    private columnsService: ColumnsService,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    super();
    this.document_additionl_charges_text = 'Additional Charges';

    this.documentId = dialogData.DocumentId;
  }

  ngOnInit() {
    this.setActionsResults();
    this.getColumns();
    this.getData();
  }

  getData() {
    if (this.documentId) {
      this.store.dispatch(
        GetDocumentAdditionalChargesByDocumentId.action({ id: this.documentId })
      );
      this.dataSource$ = this.store.select(
        selectDocumentAdditionalChargesByDocumentId(this.documentId)
      );
    }
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(
      GridColumns.DocumentAdditionalCharges
    );
  }

  onCloseBtnClicked(e: any) {}

  onDocumentAdditionalChargeRowSaving(data: any) {
    let newAdditionalCharge: DocumentAdditionalChargeDto = { ...data };
    newAdditionalCharge.DocumentId = this.documentId;
    if (!newAdditionalCharge.Id) {
      debugger;
      this.store.dispatch(
        InsertDocumentAdditionalCharge.action({ dto: newAdditionalCharge })
      );
    } else {
      this.store.dispatch(
        UpdateDocumentAdditionalCharge.action({ dto: newAdditionalCharge })
      );
    }
  }

  removeAdditionalCharge(e: any) {}

  onDocumentAdditionalChargeRowStopEditing(e: any) {
    this.getData();
  }

  onDocumentAdditionalChargeRowDeleting(data: any) {
    this.store.dispatch(DeleteDocumentAdditionalCharge.action({ id: data.Id }));
  }

  onInsertBtnClicked(e: any) {
    this.documentAdditionalChargesGrid.add(e);
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertDocumentAdditionalCharge.actionSuccess,
        insertFailure: InsertDocumentAdditionalCharge.actionFailure,
        updateSuccess: UpdateDocumentAdditionalCharge.actionSuccess,
        updateFailure: UpdateDocumentAdditionalCharge.actionFailure,
        deleteSuccess: DeleteDocumentAdditionalCharge.actionSuccess,
        deleteFailure: DeleteDocumentAdditionalCharge.actionFailure,
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
