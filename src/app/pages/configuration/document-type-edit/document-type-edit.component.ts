import { GetDocumentSeriesByDocumentTypeId } from './../../../state/parameters/document-series/document-series.actions';
import { Observable, Subject } from 'rxjs';
import {
  DeleteDocumentType,
  GetDocumentTypesLookup,
  InsertDocumentType,
  UpdateDocumentType,
} from './../../../state/parameters/document-types/document-types.actions';
import { PriceTypeEnumlist } from './../../../enumLists/price-type.enumlist';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { DnTextboxComponent } from '../../components/dn-textbox/dn-textbox.component';
import { DocumentTypeDto } from '../../../dto/document-type.dto';
import { Guid } from 'guid-typescript';
import { DnCheckboxComponent } from '../../components/dn-checkbox/dn-checkbox.component';
import { DnSelectboxComponent } from '../../components/dn-selectbox/dn-selectbox.component';
import { DocTypeAffectBehaviorEnumList } from '../../../enumLists/doc-type-affect-behavior.enumList';
import { DocumentTypeGroupEnumList } from '../../../enumLists/document-type-group.enumlist';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { TabsService } from '../../../services/tabs.service';
import { GeneralOptionsDto } from '../../../dto/configuration/general-options.dto';
import {

  GetDocumentTypeById,
} from '../../../state/parameters/document-types/document-types.actions';
import { BaseComponent } from '../../components/base/base.component';
import {
  selectDocumentTypesLookup,
  selectSelectedDocumentType,
} from '../../../state/parameters/document-types/document-types.selectors';
import { AsyncPipe } from '@angular/common';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import {
  DeleteDocumentSeries,
  InsertDocumentSeries,
  UpdateDocumentSeries,
} from '../../../state/parameters/document-series/document-series.actions';
import { DocumentSeriesDto } from '../../../dto/configuration/document-series.dto';
import { selectDocumentSeriesByDocumetTypeId } from '../../../state/parameters/document-series/document-series.selectors';
import { GetAllGeneralOptions } from '../../../state/parameters/general-options/general-options.actions';
import { selectAllGeneralOptions } from '../../../state/parameters/general-options/general-options.selectors';

@Component({
  selector: 'app-document-type-edit',
  imports: [
    DnToolbarComponent,
    MatTabsModule,
    DnTextboxComponent,
    DnCheckboxComponent,
    DnSelectboxComponent,
    DnGridComponent,
    AsyncPipe,
  ],
  providers: [TabsService],
  templateUrl: './document-type-edit.component.html',
  styleUrl: './document-type-edit.component.css',
})
export class DocumentTypeEditComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  document_type_edit_title_text: string;
  documentType: DocumentTypeDto;
  documentTypeId: Guid;
  priceTypesDataSource: any[];
  uses_prices_text: string = 'Uses Prices';
  affects_customer_balance_text: string = 'Affects Customer Balance';
  affects_warehouse_stock_text: string = 'Affects Warehouse Stock';
  affects_lot_text: string = 'Affects Lot';
  docTypeAffectBehaviorDataSource: any[];
  docTypeGroupDataSource: any[];
  docTypesDataSource: any;
  documentTypeSeriesDataSource: any;
  documentTypeSeriesColumns: DnColumnDto[];
  documentTypesTransformationsDataSource: any;
  documentTypesTransformationsColumns: DnColumnDto[];
  generalOptions$ : Observable<GeneralOptionsDto[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private colsService: ColumnsService,
  ) {
    super();
    this.store.dispatch(GetAllGeneralOptions.action())
    this.generalOptions$ = this.store.select(selectAllGeneralOptions)
    this.documentTypeId = history.state?.id;
  }

  ngOnInit(): void {
    this.setActionsResults();
    this.getLookups();
    this.getData();
    this.getDocumentTypeSeriesColumns();
    this.getDocumentTypesTransformationsColumns();
  }

  getData() {
    if (this.documentTypeId) {
      this.documentTypesTransformationsDataSource = [];
      this.store.dispatch(GetDocumentTypeById.action({ id: this.documentTypeId }));

      this.store.select(selectSelectedDocumentType).subscribe((result: any) => {
        this.documentType = { ...result };
        this.getToolbarTitle();
        this.getDocumentSeriesData();
      });
    } else {
      this.documentType = new DocumentTypeDto();
      this.getToolbarTitle();
    }
  }

  getDocumentSeriesData() {
    this.store.dispatch(
      GetDocumentSeriesByDocumentTypeId.action({ id: this.documentTypeId })
    );
    this.documentTypeSeriesDataSource = this.store.select(
      selectDocumentSeriesByDocumetTypeId(this.documentType.Id)
    );
  }

  getToolbarTitle() {
    if (this.documentType?.Id) {
      this.document_type_edit_title_text = this.documentType.Name;
    } else {
      this.document_type_edit_title_text = 'New Document Type';
    }
    this.tabsService.setTabName(this.document_type_edit_title_text);
  }

  getLookups() {
    this.priceTypesDataSource = PriceTypeEnumlist.value;
    this.docTypeAffectBehaviorDataSource = DocTypeAffectBehaviorEnumList.value;
    this.docTypeGroupDataSource = DocumentTypeGroupEnumList.value;

    //Document Types
    this.store.dispatch(GetDocumentTypesLookup.action());
    this.docTypesDataSource = this.store.select(selectDocumentTypesLookup);
  }

  getDocumentTypeSeriesColumns() {
    this.documentTypeSeriesColumns = this.colsService.getColumns(
      GridColumns.DocumentSeries
    );
  }

  getDocumentTypesTransformationsColumns() {
    this.docTypesDataSource.subscribe((result: any) => {
      let documentTypes = result;
      this.documentTypesTransformationsColumns = [
        {
          DataField: 'Id',
          DataType: 'string',
          Caption: 'Id',
          Visible: false,
        },
        {
          DataField: 'DocumentTypeId',
          DataType: 'string',
          Caption: 'Type',
          Lookup: {
            DataSource: documentTypes,
            ValueExpr: 'Id',
            DisplayExpr: 'Name',
          },
          Visible: true,
        },
        {
          DataField: 'buttons',
          DataType: 'buttons',
          Caption: '',
        },
      ];
    });
  }

  onCloseBackClicked(e: any) {
    this.router.navigate(['document-types-list']);
  }

  onSaveClicked(e: any) {
    if (this.documentType.Id) {
      this.store.dispatch(UpdateDocumentType.action({ dto: this.documentType }));
    } else {
      this.store.dispatch(InsertDocumentType.action({ dto: this.documentType }));
    }
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onDocumentSeriesDelete(data: DocumentSeriesDto) {
    this.store.dispatch(DeleteDocumentSeries.action({ id: data.Id }));
  }

  onDocumentSeriesRowAdding(data: DocumentSeriesDto) {
    data.DocumentTypeId = this.documentType.Id;
  }

  onDocumentSeriesStopEditing(data: DocumentSeriesDto) {
    this.getData();
  }

  onDocumentSeriesRowSaving(data: DocumentSeriesDto) {
    let docSeries: DocumentSeriesDto = { ...data };

    if (docSeries.Id) {
      this.store.dispatch(UpdateDocumentSeries.action({ dto: docSeries }));
    } else {
      this.store.dispatch(InsertDocumentSeries.action({ dto: docSeries }));
    }
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        getByIdDocTypeFailure: GetDocumentTypeById.actionFailure,
        insertDocTypeSuccess: InsertDocumentType.actionSuccess,
        insertDocTypeFailure: InsertDocumentType.actionFailure,
        updateDocTypeSuccess: UpdateDocumentType.actionSuccess,
        updateDocTypeFailure: UpdateDocumentType.actionFailure,
        deleteDocTypeSuccess: DeleteDocumentType.actionSuccess,
        deleteDocTypeFailure: DeleteDocumentType.actionFailure,
      },
      {
        getByIdDocTypeFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        insertDocTypeSuccess: (result: any) => {
          this.documentTypeId = result.dto.Id;
          this.displayNotification('Record inserted');
          this.getData();
        },
        insertDocTypeFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateDocTypeSuccess: () => {
          this.getToolbarTitle();
          this.displayNotification('Record updated');
          this.getData();
        },
        updateDocTypeFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        deleteDocTypeSuccess: () => {
          this.displayNotification('Record deleted');
          this.router.navigate(['document-types-list']);
        },
        deleteDocTypeFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
      },
      this.destroy$
    );

    //Document Series Actions Results
    this.setPostActionsResults(
      {
        insertDocSeriesSuccess: InsertDocumentSeries.actionSuccess,
        insertDocSeriesFailure: InsertDocumentSeries.actionFailure,
        updateDocSeriesSuccess: UpdateDocumentSeries.actionSuccess,
        updateDocSeriesFailure: UpdateDocumentSeries.actionFailure,
        deleteDocSeriesSuccess: DeleteDocumentSeries.actionSuccess,
        deleteDocSeriesFailure: DeleteDocumentSeries.actionFailure,
      },
      {
        insertDocSeriesSuccess: () => {
          this.displayNotification('Record inserted');
          this.getDocumentSeriesData();
        },
        insertDocSeriesFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateDocSeriesSuccess: () => {
          this.displayNotification('Record updated');
          this.getDocumentSeriesData();
        },
        updateDocSeriesFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        deleteDocSeriesSuccess: () => {
          this.displayNotification('Record deleted');
          this.getDocumentSeriesData();
        },
        deleteDocSeriesFailure: (result) => {
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
