import { AdditionalChargeDto } from './../../../dto/additional-charge.dto';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
  MatCellDef,
  MatFooterCell,
  MatFooterRow,
  MatFooterRowDef,
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
import { LookupNamePipe } from "../../../pipes/lookup-name.pipe";
import { ColumnDisplayTotalPipe } from "../../../pipes/column-display-total.pipe";

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
    LookupNamePipe,
    MatFooterRow,
    MatFooterRowDef,
    MatFooterCell,
    MatCellDef,
    ColumnDisplayTotalPipe
]
})
export class DnGridComponent implements OnInit,AfterViewInit {

  @ViewChild('matTable') table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Output() onRowStopEditing = new EventEmitter();
  @Output() onRowDelete = new EventEmitter();
  @Output() onRowAdding = new EventEmitter();
  @Output() onRowSaving = new EventEmitter();
  @Output() onRowEditing = new EventEmitter();
  @Output() columnsChange = new EventEmitter();
  matColumns: string[] = [];
  @Input() enableAddButton = false;
  @Input() canDisplaySearch = true;
  @Input() canEdit = true;
  @Input() hideEditButtonOnEditing = false;
  @Input() displayDeleteButtonOnEditing = false;
  @Input() canDelete = true;
  @Input() disableLineEditing = false;
  @Input() displayPaginator = true;
  @Input() displayTableBorder = false;
  @Input() tableHeaderBackgroundColor:string;
  @Input() tableHeaderFontColor:string;


  private _columns: DnColumnDto[] = [];
  zeroMin: number;
  pageIndex: any =0;
  pageSize: any =10; //Check to keep user defined settings
hasAnyColumnDisplayTotalEnabled: boolean = false;

  @Input('columns') public get columns(): DnColumnDto[] {
    return this._columns;
  }
  public set columns(v: DnColumnDto[]) {
    this.ngZone.runOutsideAngular(()=>{

    this._columns = v;
    if (this._columns) {
      this.matColumns=[]

        this._columns.forEach((column) => {
          if (column.Visible != false ) {
            this.matColumns.push(column.DataField);
          }
        });



    }
  })

  }

  private _dataSource: any;
  @Input('dataSource') public get dataSource(): any {
    return this._dataSource;
  }
  public set dataSource(v: any) {
    this._dataSource = v;
    if(this._dataSource?.length>0){
      for(let i=0; i<this._dataSource.length; i++){
       this.dataSource[i].DataSource = []

      }
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

  constructor(private ref: ChangeDetectorRef, private ngZone:NgZone) {
    this.matDataSource = new MatTableDataSource(this.dataSource);
    this.zeroMin= 0
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['columns']) {
  //     debugger

  //   }
  // }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
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
    data.rowIndex = index
    this.onRowDelete.emit(data);
  }

   onDataLookupSelectionChanged(column: DnColumnDto, data: any, lookup: any) {
    debugger
      data[column.DataField] = lookup[column.Lookup!.ValueExpr];
      if(column.OnSelectionChange){
        column.OnSelectionChange(data, this.dataSource)

      }

    this.renderRows()


  }

  updateBooleanColumn(value: boolean, row: any, column:DnColumnDto) {
    row[column.DataField] = value;
  }

  partiallyComplete = computed(() => {
    return true;
  });

  onValueChange(data:any, column:DnColumnDto){
    if(column.OnValueChange!=null){
      debugger
          column.OnValueChange(data,this.dataSource)
          this.table.renderRows()

    }
  }

  onClick(row:any, column:DnColumnDto) {
      //column.Lookup!.DataSource = col.Lookup!.DataSource
      let col = this.columns.find(x=>x.DataField ==column.DataField);

      let newDataSourceObject = new Object()
      Object.defineProperty(newDataSourceObject, column.DataField, {
        value: col!.Lookup!.DataSource,
        writable: true,
      });
      if(!row.DataSource){
        row.DataSource = []
        row.DataSource[column.DataField]=col!.Lookup!.DataSource

      }else if(!row.DataSource.some((x:any)=>newDataSourceObject.hasOwnProperty(x[column.DataField]))){
        row.DataSource[column.DataField]=col!.Lookup!.DataSource
      }
      this.ref.detectChanges()
      this.renderRows()




  }

  getLookupOptions(column: DnColumnDto, row:any, index:number){
    this.ngZone.run(()=>{
      let col = this.columns.find(x=>x.DataField ==column.DataField)!;
      column.Lookup!.DataSource = col.Lookup!.DataSource
      row.DataSource = col.Lookup!.DataSource
    })
    return row.DataSource
  }

  lookupFieldTrackBy(index:number, item:any){
    return item.Id
  }

  columnsTrackBy(index:number, item:any){
    return item.DataField
  }

  getTotal(column:any){
    if(column.DataType=='number'){
        let data = []
        for(let i=this.pageIndex; i<this.pageSize; i++){
          if(this.dataSource[i]){
            let row = this.dataSource[i]
            data.push(row)
          }

        }
        return data.map((t:any) => t[column.DataField]).reduce((acc:any, value:any) => acc + value, 0);

    }else{
      return null
    }

  }

  onPaginatorValueChange(e:any){

      this.pageSize=e.pageSize
      this.pageIndex =e.pageIndex
  }

  check(){
    debugger
    if(this.columns.some(x=>x.DisplayColumnTotal==true)){
      return true
    }else{
      return false
    }
  }
}
