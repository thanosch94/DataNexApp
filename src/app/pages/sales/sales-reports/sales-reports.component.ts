import { Component } from '@angular/core';
import { color } from 'echarts';
import { NGX_ECHARTS_CONFIG, NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-sales-reports',
  standalone: true,
  imports: [NgxEchartsModule],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: { echarts: () => import('echarts') },
    },
  ],
  templateUrl: './sales-reports.component.html',
  styleUrl: './sales-reports.component.css',
})
export class SalesReportsComponent {
  salesPerMonthOptions: any;
  productsSoldPerMonthOptions: any;
  salesByLocationOptions: any;
  orderStatusOptions: any;
  avgSalePerMonth: any;
  options: any;
  option2: any;
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
          data: [
            { value: 14, name: 'Pending' },
            { value: 1, name: 'On Hold' },
            { value: 12, name: 'Invoiced' },
            { value: 45, name: 'Completed' },
            { value: 4, name: 'Returned' },
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
          data: [5, 20, , 36, 10, , 10, , , 20],
        },
      ],
    };

    this.productsSoldPerMonthOptions = {
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
          color: 'darkgreen',
          data: [65, 40, 37, 53, 30, 42, 15, 10, 41, 52, 24, 57],
        },
      ],
    };
    this.avgSalePerMonth = {
      title: {
        text: 'Average Order per Month',
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
          data: [
            45.7,
            {
              value: 79.3,
              itemStyle: {
                color: '#a90000',
              },
            },
            23.4,
            30,
            36.7,
            21.3,
            65.2,
            46.8,
            52.1,
            34.9,
          ],
          type: 'bar',
        },
      ],
    };
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
}
