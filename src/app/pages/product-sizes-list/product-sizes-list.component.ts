import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProductSizeDto } from '../../dto/product-size.dto';
import { ProductSizesViewModel } from '../../view-models/product-sizes.viewmodel';
import { NewItemComponent } from '../components/new-item/new-item.component';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { AuthService } from '../../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DnGridComponent } from '../components/dn-grid/dn-grid.component';
import { BaseComponent } from '../components/base/base.component';

@Component({
    selector: 'app-product-sizes-list',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        DnToolbarComponent,
        MatTooltipModule,
        DnGridComponent,
    ],
    templateUrl: './product-sizes-list.component.html',
    styleUrl: './product-sizes-list.component.css'
})
export class ProductSizesListComponent extends BaseComponent implements OnInit {
  @ViewChild('productSizesGrid') productSizesGrid:DnGridComponent

  columns: any[];
  dataSource: ProductSizeDto[];
  productSizesViewModel: ProductSizesViewModel;
  productSize: ProductSizeDto = new ProductSizeDto();
  product_sizes_list_text: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {
    super()
    this.productSizesViewModel = new ProductSizesViewModel(
      this.http,
      this.auth
    );
    this.product_sizes_list_text = 'Product Sizes List';
  }

  ngOnInit() {
    this.getData();
    this.getColumns();
  }

  getData() {
    this.productSizesViewModel.GetAll().subscribe((result: any) => {
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
        DataField: 'Name',
        DataType: 'string',
        Caption: 'Name',
      },
      {
        DataField: 'Abbreviation',
        DataType: 'string',
        Caption: 'Abbreviation',
      },
      {
        DataField: 'buttons',
        DataType: 'buttons',
        Caption: '',
      },
    ];
  }

  deleteProductSize(data: any) {
    this.productSizesViewModel.DeleteById(data.Id).subscribe({
      next: (result) => {
        this.displayNotification('Record deleted')
        this.getData();
      },
      error: (err) => {
        this.displayErrorAlert(err)
      },
    });
  }

  editProductSize(data: any) {
    this.productSize = data;
    const dialogRef = this.dialog.open(NewItemComponent, {
      width: '500px',
      data: {
        title: 'Edit Item',
        name: this.productSize.Name,
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.updateItem(data);
      } else {
      }
    });
  }

  onRowSaving(data: ProductSizeDto) {
    let productSize = new ProductSizeDto();

    if (data.Id) {
      productSize.Id = data.Id;
    }
    productSize.Name = data.Name;
    productSize.Abbreviation = data.Abbreviation;

    if (!productSize.Id) {
      this.insertItem(productSize);
    } else {
      this.updateItem(productSize);
    }
  }

  updateItem(productSize: any) {
    this.productSizesViewModel
      .UpdateDto(productSize)
      .subscribe((result: any) => {
        this.getData();
        this.displayNotification('Record updated');
      });
  }

  onInsertClicked(e: any) {
    this.productSizesGrid.add(e)
  }

  insertItem(productSize: any) {
    this.productSizesViewModel
      .InsertDto(productSize)
      .subscribe((result: any) => {
        this.displayNotification('Record inserted');

        this.getData();
      });
  }

  onRefreshClicked(e: any) {
    this.getData();
  }
}
