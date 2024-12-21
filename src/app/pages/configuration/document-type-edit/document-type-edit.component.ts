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

@Component({
    selector: 'app-document-type-edit',
    imports: [
        DnToolbarComponent,
        MatTabsModule,
        DnTextboxComponent,
        DnCheckboxComponent,
        DnSelectboxComponent,
        DnGridComponent,
    ],
    providers: [TabsService],
    templateUrl: './document-type-edit.component.html',
    styleUrl: './document-type-edit.component.css'
})
export class DocumentTypeEditComponent implements OnInit {
  document_type_edit_title_text: string;
  documentType: DocumentTypeDto = new DocumentTypeDto();
  documentTypeId: Guid;
  documentTypesViewModel: DocumentTypesViewModel;
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

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private tabsService: TabsService
  ) {
    this.documentTypesViewModel = new DocumentTypesViewModel(
      this.http,
      this.auth
    );
    this.generalOptionsViewModel = new GeneralOptionsViewModel(
      this.http,
      this.auth
    );
    this.generalOptionsViewModel.GetAll().subscribe((result:GeneralOptionsDto)=>{
      this.lotsEnabled=result.LotsEnabled
    })
    this.routeSubscription = this.route.queryParams.subscribe((params: any) => {
      this.documentTypeId = params['id'];
      this.documentTypesViewModel
      .GetById(this.documentTypeId)
      .subscribe((result: any) => {
        this.documentType = result;
        this.getData();
          this.getToolbarTitle()
      });
    });
  }

  ngOnInit(): void {
    this.getDocumentTypeSeriesColumns();
    this.routeSubscription.unsubscribe()
  }

  getToolbarTitle(){
    if(this.documentType?.Id){
      this.document_type_edit_title_text = this.documentType.Name
    }else{
      this.document_type_edit_title_text = "New Document Type"

    }
    this.tabsService.setTabName(this.document_type_edit_title_text);

  }
  getData() {
    this.priceTypesDataSource = PriceTypeEnumlist.value;
    this.docTypeAffectBehaviorDataSource = DocTypeAffectBehaviorEnumList.value;
    this.docTypeGroupDataSource = DocumentTypeGroupEnumList.value;
    this.documentTypesViewModel.GetAll().subscribe((result: any) => {
      this.docTypesDataSource = result;
    });
  }

  getDocumentTypeSeriesColumns() {
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
          DataSource: this.docTypesDataSource,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
        Visible: false,
      },
    ];
  }

  onCloseBackClicked(e: any) {
    this.tabsService.setActiveTabPreviousName();
    this.router.navigate(['document-types-list']);
  }

  onSaveClicked(e: any) {
    if (this.documentType.Id) {
      this.documentTypesViewModel
        .UpdateDto(this.documentType)
        .subscribe((result: any) => {
          this.documentType = result;
          this.getToolbarTitle()
        });
    } else {
      this.documentTypesViewModel
        .InsertDto(this.documentType)
        .subscribe((result: any) => {
          this.documentType = result;
          this.getToolbarTitle()
        });
    }
  }

  onRefreshClicked(e: any) {
    this.getData();
  }
}
