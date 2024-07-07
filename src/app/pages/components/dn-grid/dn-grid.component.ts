import { AdditionalChargeDto } from './../../../dto/additional-charge.dto';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  computed,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule, MatSortHeader } from '@angular/material/sort';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DnPopupComponent } from '../dn-popup/dn-popup.component';
import { DnToolbarComponent } from '../dn-toolbar/dn-toolbar.component';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { VisbleGridColumnsPipe } from '../../../pipes/visble-grid-columns.pipe';
import { Observable } from 'rxjs/internal/Observable';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    VisbleGridColumnsPipe,
    MatCheckboxModule,
  ],

})
export class DnGridComponent implements OnInit, AfterViewInit {
  @ViewChild('matTable') table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() onRowStopEditing = new EventEmitter();
  @Output() onRowDelete = new EventEmitter();
  @Output() onRowAdding = new EventEmitter();
  @Output() onRowSaving = new EventEmitter();
  @Output() onRowEditing = new EventEmitter();
  matColumns: string[] = [];
  @Input() enableAddButton = false;
  @Input() canDisplaySearch = true;
  @Input() disableLineEditing = false;

  filteredData: Observable<any[]>;

  private _columns: DnColumnDto[] = [];
  @Input('columns') public get columns(): DnColumnDto[] {
    return this._columns;
  }
  public set columns(v: DnColumnDto[]) {
    this._columns = v;
    if (this._columns) {
      this._columns.forEach((column) => {
        if (column.Visible != false) {
          this.matColumns.push(column.DataField);
        }
      });
    }
  }

  private _dataSource: any;
  @Input('dataSource') public get dataSource(): any {
    return this._dataSource;
  }
  public set dataSource(v: any) {
    this._dataSource = v;
    this.matDataSource = new MatTableDataSource(this._dataSource);
    //setTimeout(() => {
    this.matDataSource.paginator = this.paginator;
    this.matDataSource.sort = this.sort;
    if (this.table) {
      this.renderRows();
    }
    //}, 1000);
  }

  matDataSource: MatTableDataSource<any>;
  isEditable: boolean = false;

  constructor(private ref: ChangeDetectorRef) {
    this.matDataSource = new MatTableDataSource(this.dataSource);
  }

  ngOnInit(): void {
    //1 second needed to render html else paginator and sort are undefined
  }

  ngAfterViewInit(): void {}
  applyFilter(e: any) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.matDataSource.filter = filterValue.trim().toLowerCase();

    if (this.matDataSource.paginator) {
      this.matDataSource.paginator.firstPage();
    }
  }

  add(e: any) {
    let isAnyRowItemInEditingMode = this.matDataSource.data.some(
      (x) => x.IsEditable == true
    );

    if (!isAnyRowItemInEditingMode) {
      let newRow = new Object();
      this.columns.forEach((column) => {
        Object.defineProperty(newRow, column.DataField, {
          value: null,
          writable: true,
        });
      });
      Object.defineProperty(newRow, 'IsEditable', {
        value: true,
        writable: true,
      });
      this.matDataSource.data.unshift(newRow);
      this.matDataSource.paginator = this.paginator;
      this.matDataSource.sort = this.sort;
      this.isEditable = true;
      this.table.renderRows();
      this.onRowAdding.emit(newRow);
    }
  }

  renderRows() {
    this.table.renderRows();
  }
  save(data: any, index: number) {
    this.onRowSaving.emit(data);
    data.IsEditable = false;
    this.isEditable = false;
  }

  edit(data: any, index: number) {
    //User can set disableLineEditing = true in order to disable the line editing and execute his own code (e.g. open a dialog)
    if(!this.disableLineEditing){
      let isAnyRowItemInEditingMode = this.matDataSource.data.some(
        (x) => x.IsEditable == true
      );
      if (!isAnyRowItemInEditingMode) {
        data.IsEditable = true;
        this.isEditable = true;
      }
    }
    this.onRowEditing.emit(data);

  }

  stopEditing(data: any, index: number) {
    this.isEditable = false;
    if (data.Id) {
      data.IsEditable = false;
    } else {
      this.matDataSource.data.shift();
    }
    this.onRowStopEditing.emit(data);
  }

  deleteRow(data: any, index: number) {
    this.onRowDelete.emit(data);
  }

  onDataLookupSelectionChanged(column: DnColumnDto, data: any, lookup: any) {
    data[column.DataField] = lookup.Id;
  }

  displayFn(data: any): string {
    if (data?.Name) {
      return data.Name;
    } else {
      return data;
    }
  }

  getLookupName(column: any, data: any) {
    if (data != null) {
      let lookupObject = column.Lookup.DataSource.find(
        (x: any) => x.Id == data
      );
      if (lookupObject != null) {
        return lookupObject[column.Lookup.DisplayExpr];
      }
    }
  }
  updateBooleanColumn(value: boolean, row: any, column:DnColumnDto) {
    row[column.DataField] = value;
  }

  partiallyComplete = computed(() => {
    return true;
  });
}
