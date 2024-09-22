import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { DnGridComponent } from '../../components/dn-grid/dn-grid.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { WarehouseDto } from '../../../dto/inventory/warehouse.dto';
import { WarehousesViewModel } from '../../../view-models/warehouses.viewmodel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { TabsService } from '../../../services/tabs.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DnColumnDto } from '../../../dto/dn-column.dto';

@Component({
  selector: 'app-warehouses-list',
  standalone: true,
  imports: [DnGridComponent, DnToolbarComponent, FontAwesomeModule],
  templateUrl: './warehouses-list.component.html',
  styleUrl: './warehouses-list.component.css'
})
export class WarehousesListComponent {
  @ViewChild('warehousesGrid') warehousesGrid:DnGridComponent
  warehouses_list_title_text: any;

  columns: DnColumnDto[] = [];
  warehousesViewModel: WarehousesViewModel;
  dataSource: any;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private tabsService: TabsService,
    private _snackBar: MatSnackBar,
    private router:Router,
    private ref:ChangeDetectorRef
  ) {
    this.warehousesViewModel = new WarehousesViewModel(
      this.http,
      this.auth
    );

    this.warehouses_list_title_text = 'Warehouses List';
    //tabsService.setTabName(this.warehouses_list_title_text);
  }

  ngOnInit() {
    this.getData()
    this.getColumns();

  }

  getData(){
    this.warehousesViewModel.GetAll().subscribe((result: any) => {
      this.dataSource = result;
    });
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
        DataField: 'Code',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'IsDefault',
        DataType: 'boolean',
        Caption: 'Is Default',
      },
      {
        DataField: 'CompanyId',
        DataType: 'number',
        Caption: 'Company',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }


  onInsertBtnClicked(e:any){
    this.warehousesGrid.add(e)
  }

  onWareHouseSaving(data: WarehouseDto) {
    let warehouse = new WarehouseDto();

    if (data.Id) {
      warehouse.Id = data.Id;
    }
    warehouse.Name = data.Name;
    warehouse.IsDefault = data.IsDefault;

    if (!warehouse.Id) {
      this.warehousesViewModel
        .InsertDto(warehouse)
        .subscribe((result: any) => {
          this.displayNotification("Record inserted");
          this.getData()

        });
    } else {
      this.warehousesViewModel
        .UpdateDto(warehouse)
        .subscribe((result: any) => {
          this.displayNotification("Record updated");
          this.getData()
        });
    }
  }


  onWareHouseDelete(data: WarehouseDto) {
    this.warehousesViewModel
      .DeleteById(data.Id)
      .subscribe((result: any) => {
        let index = this.warehousesGrid.matDataSource.data.indexOf(data)
        this.warehousesGrid.matDataSource.data.splice(index,1)
        this.getData()
        this.warehousesGrid.table.renderRows()
        this.displayNotification("Record deleted");

      });
  }

  onWareHouseStopEditing(e:any){
    this.getData()

  }

  displayNotification(text:string){
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
      });
  }
}
