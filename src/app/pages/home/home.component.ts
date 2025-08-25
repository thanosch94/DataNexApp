import { firstValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { ReportsService } from '../../services/reports.service';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { DnColumnDto } from '../../dto/dn-column.dto';
import { BaseComponent } from '../components/base/base.component';
import { GetAllCustomers } from '../../state/parameters/customers/customers.actions';
import { selectAllCustomers } from '../../state/parameters/customers/customers.selectors';
import { GetAllStatusesByStatusType } from '../../state/parameters/statuses/statuses.actions';
import { StatusTypeEnum } from '../../enums/status-type.enum';
import { selectAllStatusesByStatusType } from '../../state/parameters/statuses/statuses.selectors';
import { DocumentsViewModel } from '../../view-models/documents.viewmodel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { DocumentTypeGroupEnum } from '../../enums/document-type-group.enum';
import { DnPopupComponent } from "../components/dn-popup/dn-popup.component";
import { DocumentEditComponent } from "../document-edit/document-edit.component";
import { WebAppBase } from '../../base/web-app-base';

@Component({
  selector: 'app-home',
  imports: [NgxEchartsModule, DnToolbarComponent, DnGridComponent, DnPopupComponent, DocumentEditComponent],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: { echarts: () => import('echarts') },
    },
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent extends BaseComponent implements OnInit {
  monthAvgOrder: any;
  avgSalePerMonth: any;
  avgSalescolumns: DnColumnDto[];
  documentsViewModel: DocumentsViewModel;
  documents: any;
  customers: any;
  documentStatuses: any;
  ordersTotalPerMonthData: any;
  salesPerMonthOptions:any;
  ordersByStatusData: any;
  orderStatusOptions: any;
  salesByLocationOptions: any;
  isOrderPopupVisible:boolean;
  documentIdToView: any;

  constructor(
    private reportsService: ReportsService,
    private http: HttpClient,
    private auth: AuthService
  ) {
    super();
    this.documentsViewModel = new DocumentsViewModel(this.http, this.auth);
  }
  ngOnInit() {
    this.store.dispatch(GetAllCustomers.action());
    this.store.dispatch(
      GetAllStatusesByStatusType({ statusType: StatusTypeEnum.Document })
    );
    this.store.select(selectAllCustomers).subscribe((result: any) => {
      this.customers = result;
      this.store
        .select(selectAllStatusesByStatusType(StatusTypeEnum.Document))
        .subscribe((result: any) => {
          this.documentStatuses = result;
          this.getColumns();
        });
    });

    this.getData();
    this.getCharts();

  }

  getColumns() {
    this.avgSalescolumns = [
      {
        DataField: 'Id',
        DataType: 'string',
        Caption: 'Id',
        Visible: false,
      },
      {
        DataField: 'DocumentDateTime',
        DataType: 'datetime',
        Caption: 'Date',
        Visible: true,
        Format: 'dd/MM/yyyy',
      },
      {
        DataField: 'DocumentCode',
        DataType: 'string',
        Caption: 'Code',
      },
      {
        DataField: 'CustomerId',
        DataType: 'string',
        Caption: 'Customer',
        Lookup: {
          DataSource: this.customers,
          ValueExpr: 'Id',
          DisplayExpr: 'Name',
        },
      },
      // {
      //   DataField: 'DocumentStatusId',
      //   DataType: 'string',
      //   Caption: 'Status',
      //   Lookup: {
      //     DataSource: this.documentStatuses,
      //     ValueExpr: 'Id',
      //     DisplayExpr: 'Name',
      //   },
      // },

      {
        DataField: 'DocumentTotal',
        DataType: 'number',
        Caption: 'Total',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  getData() {
    this.documentsViewModel
      .GetByDocumentGroup(DocumentTypeGroupEnum.Sales)
      .subscribe((result: any) => {
        this.documents = result;
      });
  }

  getCharts(){
      this.salesByLocationOptions = {
      title: {
        text: 'Sales by Location',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: 'category',
        data: [ 'Santorini', 'Corfu', 'Kavala', 'Heraklion', 'Thessoaloniki','Athens'],
      },
      series: [
        {
          name: '2024',
          type: 'bar',
          data: [12,14,32,37,43,48],
        },
        {
          name: '2023',
          type: 'bar',
          data: [9,13,23,31,32,53],
        },
      ],
    };

this.reportsService.GetAverageOrderPerMonth().subscribe((result: any) => {
      this.monthAvgOrder = result;

      this.avgSalePerMonth = {
        title: {
          text: 'Average Order per Month',
        },
        tooltip: {
          trigger: 'item',
        },
        xAxis: {
          type: 'category',
          data: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.monthAvgOrder,
            type: 'bar',
          },
        ],
      };
    });

     this.reportsService.GetOrdersByStatus().subscribe((result:any)=>{
      this.ordersByStatusData= result
      this.orderStatusOptions = {
        title: {
          text: 'Orders by Status',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: 'Orders by Status',
            type: 'pie',
            radius: '50%',
            data: this.ordersByStatusData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      })

     this.reportsService.GetOrdersTotalPerMonth().subscribe((result:any)=>{
      this.ordersTotalPerMonthData = result

      this.salesPerMonthOptions = {
        title: {
          text: 'Sales per month',
        },
        tooltip: {},
        xAxis: {
          data: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        yAxis: {},
        series: [
          {
            name: 'Sales',
            type: 'bar',
            color: 'darkblue',
            data: this.ordersTotalPerMonthData,
          },
        ],
      };
    })
  }
  onOrderRowEditing(e:any){
    debugger
    WebAppBase.data = e.Id
    this.documentIdToView = e.Id
    // this.documentGroupToView = e.data
    DocumentTypeGroupEnum.Sales
    this.isOrderPopupVisible = true

  }

  onOrderPopupHiding(e:any){
    this.isOrderPopupVisible = false
  }
}
