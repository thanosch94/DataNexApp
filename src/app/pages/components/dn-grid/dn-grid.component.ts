import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule, MatSortHeader } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DnPopupComponent } from '../dn-popup/dn-popup.component';
import { DnToolbarComponent } from '../dn-toolbar/dn-toolbar.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { VisbleGridColumnsPipe } from "../../../pipes/visble-grid-columns.pipe";

@Component({
    selector: 'dn-grid',
    standalone: true,
    templateUrl: './dn-grid.component.html',
    styleUrl: './dn-grid.component.css',
    imports: [
        FormsModule,
        MatFormFieldModule,
        HttpClientModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        CommonModule,
        MatSelectModule,
        CdkTextareaAutosize,
        TextFieldModule,
        MatButtonModule,
        MatPaginator,
        MatPaginatorModule,
        MatSort,
        MatSortModule,
        MatTableModule,
        MatSortHeader,
        DnPopupComponent,
        MatTabsModule,
        MatDialogActions,
        MatButtonModule,
        MatDialogModule,
        DnToolbarComponent,
        AsyncPipe,
        VisbleGridColumnsPipe
    ]
})
export class DnGridComponent {
  @ViewChild('matTable') table: MatTable<any>;

  @Output() onRowStopEditing = new EventEmitter();
  @Output() onRowDelete = new EventEmitter();
  @Output() onRowAdding = new EventEmitter();
  @Output() onRowSaving = new EventEmitter();
  @Output() onRowEditing = new EventEmitter();
  matColumns: string[] = [];

  private _columns: DnColumnDto[] = [];
  @Input('columns') public get columns(): DnColumnDto[] {
    return this._columns;
  }
  public set columns(v: DnColumnDto[]) {
    this._columns = v;
    this._columns.forEach((column) => {
      if(column.Visible!=false){
        this.matColumns.push(column.DataField);
      }
    });
  }

  @Input() dataSource: any[] = [];
  isEditable: boolean;

  constructor(private ref:ChangeDetectorRef) {}
  add(e: any) {

    this.isEditable = true;
    let newRow = new Object();
    this.columns.forEach(column => {
      Object.defineProperty(newRow, column.DataField, {value:null, writable:true});
    });
    Object.defineProperty(newRow, "IsEditable", {value:true, writable:true});
    if (this.dataSource.length==0) {

    this.dataSource.push(newRow)
    }
    if (!this.dataSource.some((x) => x.IsEditable == true)) {
      this.dataSource.unshift(newRow);

    }

    this.table.renderRows()
    this.onRowAdding.emit(e);
  }

  save(data: any, index: number) {
    this.onRowSaving.emit(data);
    data.IsEditable=false
    this.isEditable =false
  }

  edit(data: any, index: number) {
    data.IsEditable=true
    this.isEditable= true
    this.onRowEditing.emit(data);
  }

  stopEditing(data: any, index: number) {
    this.isEditable =false
    if (data.Id) {
      data.IsEditable = false;
      this.table.renderRows();
    } else {
      this.dataSource.shift();
      this.table.renderRows();
    }
    this.onRowStopEditing.emit(data);
  }

  deleteRow(data: any, index: number) {
    this.onRowDelete.emit(data);
  }
}
