import { GetDocumentSeriesByDocumentTypeId } from './../../../state/parameters/document-series/document-series.actions';
import { StateHelperService } from './../../../services/state-helper.service';
import { Subject } from 'rxjs';
import {
  GetDocumentTypesLookup,
  InsertDocumentTypeDto,
  UpdateDocumentTypeDto,
} from './../../../state/parameters/document-types/document-types.actions';
import { GeneralOptionsViewModel } from './../../../view-models/general-options.viewmodel';
import { PriceTypeEnumlist } from './../../../enumLists/price-type.enumlist';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { DnTextboxComponent } from '../../components/dn-textbox/dn-textbox.component';
import { DocumentTypeDto } from '../../../dto/document-type.dto';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { DnCheckboxComponent } from '../../components/dn-checkbox/dn-checkbox.component';
import { DnSelectboxComponent } from '../../components/dn-selectbox/dn-selectbox.component';
import { DocTypeAffectBehaviorEnumList } from '../../../enumLists/doc-type-affect-behavior.enumList';
import { DocumentTypeGroupEnumList } from '../../../enumLists/document-type-group.enumlist';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { TabsService } from '../../../services/tabs.service';
import { GeneralOptionsDto } from '../../../dto/configuration/general-options.dto';
import {
  DeleteDocumentTypeByIdFailure,
  DeleteDocumentTypeByIdSuccess,
  GetDocumentTypeById,
  GetDocumentTypeByIdFailure,
  InsertDocumentTypeDtoFailure,
  InsertDocumentTypeDtoSuccess,
  UpdateDocumentTypeDtoFailure,
  UpdateDocumentTypeDtoSuccess,
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
  affects_lot_text: string = 'Affects Lot';
  docTypeAffectBehaviorDataSource: any[];
  docTypeGroupDataSource: any[];
  docTypesDataSource: any;
  documentTypeSeriesDataSource: any;
  documentTypeSeriesColumns: DnColumnDto[];
  lotsEnabled: boolean;
  generalOptionsViewModel: GeneralOptionsViewModel;
  documentTypesTransformationsDataSource: any;
  documentTypesTransformationsColumns: DnColumnDto[];
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private tabsService: TabsService,
    private colsService: ColumnsService,
    private stateHelperService: StateHelperService
  ) {
    super();
    this.generalOptionsViewModel = new GeneralOptionsViewModel(
      this.http,
      this.auth
    );
    this.getLookups();
    this.generalOptionsViewModel
      .GetAll()
      .subscribe((result: GeneralOptionsDto) => {
        this.lotsEnabled = result.LotsEnabled;
      });
    this.documentTypeId = history.state?.id;
  }

  ngOnInit(): void {
    this.setActionsResults();
    this.getData();
    this.getDocumentTypeSeriesColumns();
    this.getDocumentTypesTransformationsColumns();
  }

  getData() {
    if (this.documentTypeId) {
      this.documentTypesTransformationsDataSource = [];
      this.store.dispatch(GetDocumentTypeById({ id: this.documentTypeId }));

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
    this.store.dispatch(GetDocumentTypesLookup());
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
      this.store.dispatch(UpdateDocumentTypeDto({ dto: this.documentType }));
    } else {
      this.store.dispatch(InsertDocumentTypeDto({ dto: this.documentType }));
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
    this.getByIdFailureActionResult();
    this.setInsertDtoSuccessActionResult();
    this.setInsertDtoFailureActionResult();
    this.setUpdateDtoSuccessActionResult();
    this.setUpdateDtoFailureActionResult();
    this.setDeleteByIdSuccessActionResult();
    this.setDeleteByIdFailureActionResult();
    //Document Series Actions Results
    this.setInsertDocSeriesDtoSuccessActionResult();
    this.setInsertDocSeriesDtoFailureActionResult();
    this.setUpdateDocSeriesDtoSuccessActionResult();
    this.setUpdateDocSeriesDtoFailureActionResult();
    this.setDeleteDocSeriesByIdSuccessActionResult();
    this.setDeleteDocSeriesByIdFailureActionResult();
  }

  getByIdFailureActionResult() {
    this.stateHelperService
      .setActionResult(GetDocumentTypeByIdFailure, this.destroy$)
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
      });
  }

  setInsertDtoSuccessActionResult() {
    this.stateHelperService
      .setActionResult(InsertDocumentTypeDtoSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.documentTypeId = result.dto.Id;
        this.getData();
        this.displayNotification('Record inserted');
      });
  }

  setInsertDtoFailureActionResult() {
    this.stateHelperService
      .setActionResult(InsertDocumentTypeDtoFailure, this.destroy$)
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.stateHelperService
      .setActionResult(UpdateDocumentTypeDtoSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.getData();
        this.getToolbarTitle();
        this.displayNotification('Record updated');
      });
  }

  setUpdateDtoFailureActionResult() {
    this.stateHelperService
      .setActionResult(UpdateDocumentTypeDtoFailure, this.destroy$)
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.stateHelperService
      .setActionResult(DeleteDocumentTypeByIdSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.router.navigate(['document-types-list']);
      });
  }

  setDeleteByIdFailureActionResult() {
    this.stateHelperService
      .setActionResult(DeleteDocumentTypeByIdFailure, this.destroy$)
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
      });
  }

  //Document Series Actions Results
  setInsertDocSeriesDtoSuccessActionResult() {
    this.stateHelperService
      .setActionResult(InsertDocumentSeries.actionSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.getDocumentSeriesData();
        this.displayNotification('Record inserted');
      });
  }

  setInsertDocSeriesDtoFailureActionResult() {
    this.stateHelperService
      .setActionResult(InsertDocumentSeries.actionFailure, this.destroy$)
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
      });
  }

  setUpdateDocSeriesDtoSuccessActionResult() {
    this.stateHelperService
      .setActionResult(UpdateDocumentSeries.actionSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.getDocumentSeriesData();
        this.displayNotification('Record updated');
      });
  }

  setUpdateDocSeriesDtoFailureActionResult() {
    this.stateHelperService
      .setActionResult(UpdateDocumentSeries.actionFailure, this.destroy$)
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
      });
  }

  setDeleteDocSeriesByIdSuccessActionResult() {
    this.stateHelperService
      .setActionResult(DeleteDocumentSeries.actionSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
      });
  }

  setDeleteDocSeriesByIdFailureActionResult() {
    this.stateHelperService
      .setActionResult(DeleteDocumentSeries.actionFailure, this.destroy$)
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
      });
  }

  //#endregion

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
