import { ReportsService } from './../../../services/reports.service';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { color } from 'echarts';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';

@Component({
    selector: 'app-sales-reports',
    imports: [NgxEchartsModule, DnToolbarComponent],
    providers: [
        {
            provide: NGX_ECHARTS_CONFIG,
            useValue: { echarts: () => import('echarts') },
        },
    ],
    templateUrl: './sales-reports.component.html',
    styleUrl: './sales-reports.component.css'
})
export class SalesReportsComponent {
  @Input() displayToolbar:boolean = true;
  salesPerMonthOptions: any;
  productsSoldPerMonthOptions: any;
  salesByLocationOptions: any;
  orderStatusOptions: any;
  avgSalePerMonth: any;
  options: any;
  option2: any;
  sales_reports_text: any;
  ordersByStatusData: any[];
  monthAvgOrder: any[];
  ordersTotalPerMonthData: any[];

  constructor(private reportsService:ReportsService, private ref:ChangeDetectorRef){
    this.sales_reports_text = "Sales Reports"

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

    this.reportsService.GetAverageOrderPerMonth().subscribe((result:any)=>{
      this.monthAvgOrder = result

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
            data:this.monthAvgOrder,
            type: 'bar',
          },
        ],
      };
    })

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
  }


  ngAfterViewInit() {
    this.option2 = {
      title: {
        text: 'Rainfall vs Evaporation',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Rainfall', 'Evaporation'],
        left: 'right',
      },
      toolbox: {},
      calculable: true,
      xAxis: [
        {
          type: 'category',
          // prettier-ignore
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Rainfall',
          type: 'bar',
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
          ],
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' },
            ],
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }],
          },
        },
        {
          name: 'Evaporation',
          type: 'bar',
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
          ],
          markPoint: {
            data: [
              { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
              { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 },
            ],
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }],
          },
        },
      ],
    };


    this.options = {
      title: {
        text: 'Sales by Product Category',
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
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 42, name: 'Shoes' },
            { value: 96, name: 'T-Shirts' },
            { value: 23, name: 'Trousers' },
            { value: 51, name: 'Underwear' },
            { value: 28, name: 'Shorts' },
          ],
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



    // this.productsSoldPerMonthOptions = {
    //   title: {
    //     text: 'Sales per month',
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     data: [
    //       'Jan',
    //       'Feb',
    //       'Mar',
    //       'Apr',
    //       'May',
    //       'Jun',
    //       'Jul',
    //       'Aug',
    //       'Sep',
    //       'Oct',
    //       'Nov',
    //       'Dec',
    //     ],
    //   },
    //   yAxis: {},
    //   series: [
    //     {
    //       name: 'Sales',
    //       type: 'bar',
    //       color: 'darkgreen',
    //       data: [65, 40, 37, 53, 30, 42, 15, 10, 41, 52, 24, 57],
    //     },
    //   ],
    // };

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
  }
  onRefreshBtnClicked(e:any){

  }
}
