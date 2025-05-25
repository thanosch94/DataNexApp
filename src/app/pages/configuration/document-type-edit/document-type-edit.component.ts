import { firstValueFrom } from 'rxjs';
import {
  GetDocumentTypesLookup,
  InsertDocumentTypeDto,
  UpdateDocumentTypeDto,
} from './../../../state/parameters/document-types/document-types.actions';
import { GeneralOptionsViewModel } from './../../../view-models/general-options.viewmodel';
import { PriceTypeEnumlist } from './../../../enumLists/price-type.enumlist';
import { DocumentTypesViewModel } from './../../../view-models/document-types.viewmodel';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
import { LotSettingsDto } from '../../../dto/configuration/lot-settings.dto';
import { GeneralOptionsDto } from '../../../dto/configuration/general-options.dto';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import {
  DeleteDocumentTypeByIdFailure,
  DeleteDocumentTypeByIdSuccess,
  GetDocumentTypeById,
  GetDocumentTypeByIdFailure,
  GetDocumentTypeByIdSuccess,
  InsertDocumentTypeDtoFailure,
  InsertDocumentTypeDtoSuccess,
  UpdateDocumentTypeDtoFailure,
  UpdateDocumentTypeDtoSuccess,
} from '../../../state/parameters/document-types/document-types.actions';
import { BaseComponent } from '../../components/base/base.component';
import { selectDocumentTypesLookup, selectSelectedDocumentType } from '../../../state/parameters/document-types/document-types.selectors';
import { AsyncPipe } from '@angular/common';

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
export class DocumentTypeEditComponent extends BaseComponent implements OnInit {
  document_type_edit_title_text: string;
  documentType: any;
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
  routeSubscription: any;
  lotsEnabled: boolean;
  generalOptionsViewModel: GeneralOptionsViewModel;
documentTypesTransformationsDataSource: any;
documentTypesTransformationsColumns: DnColumnDto[];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private tabsService: TabsService,
    private actions$: Actions
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
    this.getDocumentTypesTransformationsColumns()
    //this.routeSubscription.unsubscribe();
  }

  setActionsResults() {
    this.getByIdFailureActionResult();
    this.setInsertDtoSuccessActionResult();
    this.setInsertDtoFailureActionResult();
    this.setUpdateDtoSuccessActionResult();
    this.setUpdateDtoFailureActionResult();
    this.setDeleteByIdSuccessActionResult();
    this.setDeleteByIdFailureActionResult();
  }



  getByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(GetDocumentTypeByIdFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
      });
  }

  setInsertDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(InsertDocumentTypeDtoSuccess))
      .subscribe((result: any) => {
        this.documentTypeId =result.dto.Id;
        this.getData();
        this.displayNotification('Record inserted');
      });
  }

  setInsertDtoFailureActionResult() {
    this.actions$
      .pipe(ofType(InsertDocumentTypeDtoFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(UpdateDocumentTypeDtoSuccess))
      .subscribe((result: any) => {
        this.getData();
        this.getToolbarTitle();
        this.displayNotification('Record updated');
      });
  }

  setUpdateDtoFailureActionResult() {
    this.actions$
      .pipe(ofType(UpdateDocumentTypeDtoFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteDocumentTypeByIdSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.router.navigate(['document-types-list']);
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteDocumentTypeByIdFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
      });
  }

  getData() {
    if (this.documentTypeId) {
      this.documentTypesTransformationsDataSource=[]
      this.store.dispatch(GetDocumentTypeById({ id: this.documentTypeId }));

      this.store.select(selectSelectedDocumentType).subscribe((result:any)=>{
        this.documentType = {...result}
        this.getToolbarTitle();

      })
    } else {
      this.documentType = new DocumentTypeDto();
      this.getToolbarTitle();
    }
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

  async getDocumentTypeSeriesColumns() {
    this.documentTypeSeriesColumns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'Abbrevation',
        DataType: 'string',
        Caption: 'Abbrevation',
      },
      {
        DataField: 'DocumentTypeId',
        DataType: 'string',
        Caption: 'Type',
        Lookup: {
          DataSource: await firstValueFrom(this.docTypesDataSource),
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
        Visible: false,
      },
    ];
  }

  getDocumentTypesTransformationsColumns(){
    this.docTypesDataSource.subscribe((result:any)=>{
      let documentTypes = result
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
      ]
    })


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
}
