import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  computed,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule, MatSortHeader } from '@angular/material/sort';
import {
  MatCellDef,
  MatFooterCell,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCellDef,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DnColumnDto } from '../../../dto/dn-column.dto';
import { VisbleGridColumnsPipe } from '../../../pipes/visble-grid-columns.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LookupNamePipe } from '../../../pipes/lookup-name.pipe';
import { ColumnDisplayTotalPipe } from '../../../pipes/column-display-total.pipe';
import { DnTextboxComponent } from '../dn-textbox/dn-textbox.component';
import { DnNumberBoxComponent } from '../dn-number-box/dn-number-box.component';
import { DnDateBoxComponent } from '../dn-date-box/dn-date-box.component';
import { DnSelectboxComponent } from '../dn-selectbox/dn-selectbox.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'dn-grid',
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
    TextFieldModule,
    MatButtonModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatTableModule,
    MatSortHeader,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    VisbleGridColumnsPipe,
    MatCheckboxModule,
    LookupNamePipe,
    MatFooterRow,
    MatFooterRowDef,
    MatFooterCell,
    MatCellDef,
    ColumnDisplayTotalPipe,
    DnTextboxComponent,
    DnNumberBoxComponent,
    DnDateBoxComponent,
    DnSelectboxComponent,
    MatHeaderCellDef,
  ],
})
export class DnGridComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('matTable') table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() onRowStopEditing = new EventEmitter();
  @Output() dataSourceChange = new EventEmitter();
  @Output() onRowDelete = new EventEmitter();
  @Output() onRowAdding = new EventEmitter();
  @Output() onRowSaving = new EventEmitter();
  @Output() onRowEditing = new EventEmitter();
  @Output() columnsChange = new EventEmitter();
  @Output() onInfoButtonClicked = new EventEmitter();
  @Output() onRowSelectionChanged = new EventEmitter();
  matColumns: string[] = [];
  @Input() enableAddButton = false;
  @Input() addButtonText: string = 'Add';
  @Input() canDisplaySearch = true;
  @Input() canEdit = true;
  @Input() hideEditButtonOnEditing = false;
  @Input() displayDeleteButtonOnEditing = false;
  @Input() canDelete = true;
  @Input() showInfo = false;
  @Input() disableLineEditing = false;
  @Input() displayPaginator = true;
  @Input() displayTableBorder = false;
  @Input() tableHeaderBackgroundColor: string;
  @Input() tableHeaderFontColor: string;
  @Input() borderTopColor: string = '#0B6AA5';
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  selection = new SelectionModel<any>(true, []);
  private _columns: DnColumnDto[] = [];
  zeroMin: number;
  pageIndex: number = 0;
  @Input() pageSize: number = 10; //Check to keep user defined settings
  hasAnyColumnDisplayTotalEnabled: boolean = false;

  @Input('columns') public get columns(): DnColumnDto[] {
    return this._columns;
  }
  public set columns(v: DnColumnDto[]) {
    this.ngZone.runOutsideAngular(() => {
      this._columns = v;
      if (this._columns) {
        this.matColumns = [];

        this._columns.forEach((column) => {
          if (column.Visible != false) {
            this.matColumns.push(column.DataField);
          }
        });
      }
    });
  }

  private _dataSource: any;
  @Input('dataSource') public get dataSource(): any {
    return this._dataSource;
  }
  public set dataSource(v: any) {
    this._dataSource = v;
    if (this._dataSource?.length > 0) {
      this._dataSource = this._dataSource.map((item: any) => {
        return {
          ...item,
          DataSource: [],
        };
      });
    }
    if (this._dataSource) {
      this._dataSource = [...this._dataSource];
    }
    this.matDataSource = new MatTableDataSource(this._dataSource);
    this.matDataSource.paginator = this.paginator;
    this.matDataSource.sort = this.sort;

    if (this.table) {
      this.renderRows();
    }
  }

  matDataSource: MatTableDataSource<any>;
  isEditable: boolean = false;

  constructor(
    private ref: ChangeDetectorRef,
    private ngZone: NgZone,
    private dialog: MatDialog
  ) {
    this.matDataSource = new MatTableDataSource(this.dataSource);
    this.zeroMin = 0;
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['columns']) {

  //   }
  // }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']) {
      this.dataSourceChange.emit(changes['dataSource'].currentValue);
    }
    this.renderRows();
  }

  ngAfterViewInit() {
    this.matDataSource.paginator = this.paginator;
    this.ref.detectChanges();
  }

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
          value: column.DefaultValue,
          writable: true,
          enumerable: true,
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
    if (this.table) {
      this.table.renderRows();
    }
  }
  save(data: any) {
    this.onRowSaving.emit(data);
    data.IsEditable = false;
    this.isEditable = false;
  }

  edit(data: any) {
    //User can set disableLineEditing = true in order to disable the line editing and execute his own code (e.g. open a dialog)
    if (!this.disableLineEditing) {
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
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '320px',
      maxHeight: '300px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.onRowDelete.emit(data);
      } else {
        //No action
      }
    });
    data.rowIndex = index;
  }

  selectHandler(row: any) {
    this.selection.toggle(row);
  }

  onDataLookupSelectionChanged(column: DnColumnDto, data: any, e: any) {
    data[column.DataField] = e;
    if (column.OnSelectionChange) {
      column.OnSelectionChange(data, this.dataSource);
    }

    this.renderRows();
  }

  updateBooleanColumn(value: boolean, row: any, column: DnColumnDto) {
    row[column.DataField] = value;
  }

  partiallyComplete = computed(() => {
    return true;
  });

  onValueChange(data: any, column: DnColumnDto) {
    if (column.OnValueChange != null) {
      column.OnValueChange(data, this.dataSource, column);
      this.table.renderRows();
    }
  }

  onClick(row: any, column: DnColumnDto) {
    //column.Lookup!.DataSource = col.Lookup!.DataSource

    if (column.OnClick) {
      column.OnClick(row, column);
    }
  }

  getLookupOptions(column: DnColumnDto, row: any, index: number) {
    this.ngZone.run(() => {
      let col = this.columns.find((x) => x.DataField == column.DataField)!;
      column.Lookup!.DataSource = col.Lookup!.DataSource;
      row.DataSource = col.Lookup!.DataSource;
    });
    return row.DataSource;
  }

  lookupFieldTrackBy(index: number, item: any) {
    return item.Id;
  }

  columnsTrackBy(index: number, item: any) {
    return item.DataField;
  }

  getTotal(column: any) {
    if (column.DataType == 'number') {
      let data = [];
      if (this.dataSource) {
        for (let i = this.pageIndex; i < this.pageSize; i++) {
          if (this.dataSource[i]) {
            let row = this.dataSource[i];
            data.push(row);
          }
        }
      }
      return data
        .map((t: any) => t[column.DataField])
        .reduce((acc: any, value: any) => acc + value, 0);
    } else {
      return null;
    }
  }

  onPaginatorValueChange(e: any) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  displayFooter() {
    if (this.columns) {
      if (this.columns.some((x) => x.DisplayColumnTotal == true)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onInfoBtnClicked(row: any) {
    this.onInfoButtonClicked.emit(row);
  }

  onIconClicked(e: any, column: DnColumnDto, row: any) {
    if (column.OnIconClicked) {
      column.OnIconClicked(row);
    }
  }

  onFocusOut(e: any, column: DnColumnDto, row: any) {
    if (column.OnFocusOut) {
      column.OnFocusOut(row, column);
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row: any) => this.selection.select(row));
  }

  onRowSelectionChange(e: any, row: any) {
    this.selection.toggle(row);
    this.onRowSelectionChanged.emit(this.selection.selected);
  }
}
