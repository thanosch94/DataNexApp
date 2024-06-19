import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DnPopupComponent } from '../dn-popup/dn-popup.component';
import { DnToolbarComponent } from '../dn-toolbar/dn-toolbar.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';

@Component({
  selector: 'dn-grid',
  standalone: true,
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
  ],
  templateUrl: './dn-grid.component.html',
  styleUrl: './dn-grid.component.css',
})
export class DnGridComponent {
  @Output() onRowStopEditing = new EventEmitter();
  @Output() onRowDelete = new EventEmitter();
  @Output() onRowAdding = new EventEmitter();
  matColumns: string[] = [];

  private _columns: any[] = [];
  @Input('columns') public get columns(): any[] {
    return this._columns;
  }
  public set columns(v: any[]) {
    this._columns = v;
    this._columns.forEach((element) => {
      this.matColumns.push(element.DataField);
    });
  }

  @Input() dataSource: any[] = [];
  isEditable: boolean;

  constructor() {}
  add(e: any) {
    this.isEditable = true;
    this.onRowAdding.emit(e);
  }

  save(data: any, index: number) {
    this.onRowStopEditing.emit(data);
    data.IsEditable=false
    this.isEditable =false
  }

  edit(data: any, index: number) {
    data.IsEditable=true
    this.isEditable= true
    debugger
    this.onRowDelete.emit(data);
  }

  stopEditing(data: any, index: number) {
    data.IsEditable=false
    this.isEditable =false
    this.onRowStopEditing.emit(data);
  }

  deleteRow(data: any, index: number) {
    this.onRowDelete.emit(data);
  }
}
