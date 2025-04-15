import { Component, ViewChild } from '@angular/core';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { VatClassDto } from '../../../dto/vat-class.dto';
import { Store } from '@ngrx/store';
import {
  DeleteVatClassById,
  DeleteVatClassByIdFailure,
  DeleteVatClassByIdSuccess,
  GetAllVatClasses,
  InsertVatClassDto,
  InsertVatClassDtoSuccess,
  UpdateVatClassDto,
  UpdateVatClassDtoFailure,
  UpdateVatClassDtoSuccess,
} from '../../../state/parameters/vat-classes/vat-classes.actions';
import { selectAllVatClasses } from '../../../state/parameters/vat-classes/vat-classes.selectors';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { BaseComponent } from '../../components/base/base.component';

@Component({
  selector: 'app-vat-classes',
  imports: [DnGridComponent, DnToolbarComponent, AsyncPipe],
  templateUrl: './vat-classes.component.html',
  styleUrl: './vat-classes.component.css',
})
export class VatClassesComponent extends BaseComponent {
  @ViewChild('vatClassesGrid')
  vatClassesGrid: DnGridComponent;
  dataSource: Observable<VatClassDto[]>;
  columns: DnColumnDto[] = [];
  vat_classes_list_title_text: string;

  constructor(
    private store: Store,
    private actions$: Actions
  ) {
    super();
    this.vat_classes_list_title_text = 'Vat Classes List';
  }

  ngOnInit() {
    this.setActionsResults()
    this.getData();
    this.getColumns();
  }

  setActionsResults(){
    this.setInsertDtoSuccessActionResult();
    this.setUpdateDtoSuccessActionResult();
    this.setUpdateDtoFailureActionResult();
    this.setDeleteByIdSuccessActionResult();
    this.setDeleteByIdFailureActionResult();
  }

  setInsertDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(InsertVatClassDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record inserted');
        this.getData();
      });
  }

  setUpdateDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(UpdateVatClassDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record updated');
        this.getData();
      });
  }

  setUpdateDtoFailureActionResult() {
    this.actions$
      .pipe(ofType(UpdateVatClassDtoFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  setDeleteByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteVatClassByIdSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.getData();
      });
  }

  setDeleteByIdFailureActionResult() {
    this.actions$
      .pipe(ofType(DeleteVatClassByIdFailure))
      .subscribe((result: any) => {
        this.displayErrorAlert(result.error);
        this.getData();
      });
  }

  getData() {
    this.store.dispatch(GetAllVatClasses());
    this.dataSource = this.store.select(selectAllVatClasses);
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
        DataField: 'Abbreviation',
        DataType: 'string',
        Caption: 'Abbreviation',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Rate',
        DataType: 'number',
        Caption: 'Rate',
      },
      {
        DataField: 'Decription',
        DataType: 'string',
        Caption: 'Decription',
        Visible: false,
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
    this.vatClassesGrid.add(e);
  }

  onVatClassSaving(data: VatClassDto) {
    let vatClass:VatClassDto={...data};

    if (!vatClass.Id) {
      this.store.dispatch(InsertVatClassDto({ dto: vatClass }));
    } else {
      this.store.dispatch(UpdateVatClassDto({ dto: vatClass }));
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
}
