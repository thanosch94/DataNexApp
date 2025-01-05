import { TabsService } from './../../../services/tabs.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { DnColumnDto } from '../../../dto/dn-column.dto';
import { DocumentTypeDto } from '../../../dto/document-type.dto';
import { DocumentTypeGroupEnumList } from '../../../enumLists/document-type-group.enumlist';
import { DocumentTypesViewModel } from '../../../view-models/document-types.viewmodel';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DocTypeAffectBehaviorEnumList } from '../../../enumLists/doc-type-affect-behavior.enumList';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  DeleteDocumentTypeById,
  DeleteDocumentTypeByIdFailure,
  DeleteDocumentTypeByIdSuccess,
  GetAllDocumentTypes,
} from '../../../state/parameters/document-types/document-types.actions';
import { selectAllDocumentTypes } from '../../../state/parameters/document-types/document-types.selectors';
import { AsyncPipe } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '../../components/base/base.component';

@Component({
  selector: 'app-document-types',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './document-types-list.component.html',
  styleUrl: './document-types-list.component.css',
})
export class DocumentTypesListComponent
  extends BaseComponent
  implements OnInit
{
  dataSource: any;
  document_types_list_title_text: string;
  columns: DnColumnDto[] = [];

  constructor(
    private router: Router,
    private store: Store,
    private actions$: Actions,
    private tabsService:TabsService
  ) {
    super();
    this.document_types_list_title_text = 'Document Types List';
    this.tabsService.setActiveTabName(this.document_types_list_title_text)
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
  }

  setActionsResults() {
    this.setDeleteByIdSuccessActionResult();
    this.setDeleteByIdFailureActionResult();
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteDocumentTypeByIdSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.getData();
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteDocumentTypeByIdFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  getData() {
    this.store.dispatch(GetAllDocumentTypes());
    this.dataSource = this.store.select(selectAllDocumentTypes);
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
        Lookup: {
          DataSource: DocTypeAffectBehaviorEnumList.value,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      {
        DataField: 'WareHouseAffectBehavior',
        DataType: 'string',
        Caption: 'Affects Warehouse',
        Visible: true,
        Lookup: {
          DataSource: DocTypeAffectBehaviorEnumList.value,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
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
    this.router.navigate(['document-type-edit']);
  }

  onDocumentTypeDelete(data: DocumentTypeDto) {
    this.store.dispatch(DeleteDocumentTypeById({ id: data.Id }));
  }

  onDocumentTypesStopEditing(e: any) {
    this.getData();
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onRowEditing(e: any) {
    this.router.navigate(['document-type-edit'], { state: { id: e.Id }});
  }
}
