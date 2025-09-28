import { TabsService } from './../../../services/tabs.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

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
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';
import { StateHelperService } from '../../../services/state-helper.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-document-types',
  imports: [DnToolbarComponent, DnGridComponent, AsyncPipe],
  templateUrl: './document-types-list.component.html',
  styleUrl: './document-types-list.component.css',
})
export class DocumentTypesListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  dataSource: any;
  document_types_list_title_text: string;
  columns: DnColumnDto[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private actions$: Actions,
    private tabsService: TabsService,
    private colsService: ColumnsService,
    private stateHelperService: StateHelperService
  ) {
    super();
    this.document_types_list_title_text = 'Document Types List';
    this.tabsService.setActiveTabName(this.document_types_list_title_text);
  }

  ngOnInit() {
    this.setActionsResults();
    this.getColumns();
    this.getData();
  }

  getData() {
    this.store.dispatch(GetAllDocumentTypes());
    this.dataSource = this.store.select(selectAllDocumentTypes);
  }

  getColumns() {
    this.columns = this.colsService.getColumns(GridColumns.DocumentTypes);
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
    this.router.navigate(['document-type-edit'], { state: { id: e.Id } });
  }

  //#region Actions Results
  setActionsResults() {
    this.setDeleteByIdSuccessActionResult();
    this.setDeleteByIdFailureActionResult();
  }

  setDeleteByIdSuccessActionResult() {
    this.stateHelperService
      .setActionResult(DeleteDocumentTypeByIdSuccess, this.destroy$)
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.getData();
      });
  }

  setDeleteByIdFailureActionResult() {
    this.stateHelperService
      .setActionResult(DeleteDocumentTypeByIdFailure, this.destroy$)
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }
  //#endregion

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
