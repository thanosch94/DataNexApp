import { Component, Input, OnDestroy, OnInit, output, ViewChild } from '@angular/core';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { VatClassDto } from '../../../dto/vat-class.dto';
import {
  DeleteVatClassById,
  DeleteVatClassByIdFailure,
  DeleteVatClassByIdSuccess,
  GetAllVatClasses,
  InsertVatClassDto,
  InsertVatClassDtoFailure,
  InsertVatClassDtoSuccess,
  UpdateVatClassDto,
  UpdateVatClassDtoFailure,
  UpdateVatClassDtoSuccess,
} from '../../../state/parameters/vat-classes/vat-classes.actions';
import { selectAllVatClasses } from '../../../state/parameters/vat-classes/vat-classes.selectors';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { BaseComponent } from '../../components/base/base.component';
import { ColumnsService } from '../../../services/columns.service';
import { GridColumns } from '../../../base/grid-columns';

@Component({
  selector: 'vat-classes-list',
  imports: [DnGridComponent, DnToolbarComponent, AsyncPipe],
  templateUrl: './vat-classes-list.component.html',
  styleUrl: './vat-classes-list.component.css',
})
export class VatClassesListComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('vatClassesGrid')
  vatClassesGrid: DnGridComponent;
  dataSource: Observable<VatClassDto[]>;
  columns: DnColumnDto[] = [];
  vat_classes_list_title_text: string;
  @Input() isInPopup:boolean;
  close= output()
  private destroy$ = new Subject<void>();

  constructor(
    private columnsService: ColumnsService,
  ) {
    super();
    this.vat_classes_list_title_text = 'Vat Classes List';
  }

  ngOnInit() {
    this.setActionsResults();
    this.getData();
    this.getColumns();
  }

  getData() {
    this.store.dispatch(GetAllVatClasses());
    this.dataSource = this.store.select(selectAllVatClasses);
  }

  getColumns() {
    this.columns = this.columnsService.getColumns(GridColumns.VatClasses);
  }

  onInsertClicked(e: any) {
    this.vatClassesGrid.add(e);
  }

  onVatClassSaving(data: VatClassDto) {
    let dto: VatClassDto = { ...data };

    if (!dto.Id) {
      this.store.dispatch(InsertVatClassDto({ dto }));
    } else {
      this.store.dispatch(UpdateVatClassDto({ dto }));
    }
  }

  onVatClassDelete(data: VatClassDto) {
    this.store.dispatch(DeleteVatClassById({ id: data.Id }));
  }

  onVatClassStopEditing(e: any) {
    this.getData();
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onClose(){
    if(this.isInPopup){
      this.close.emit()
    }
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertVatClassDtoSuccess,
        insertFailure: InsertVatClassDtoFailure,
        updateSuccess: UpdateVatClassDtoSuccess,
        updateFailure: UpdateVatClassDtoFailure,
        deleteSuccess: DeleteVatClassByIdSuccess,
        deleteFailure: DeleteVatClassByIdFailure,
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
