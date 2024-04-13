import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DocumentTypeDto } from '../../dto/document-type.dto';
import { DocumentTypesViewModel } from '../../view-models/document-types.viewmodel';
import { MatDialog } from '@angular/material/dialog';
import { NewItemComponent } from '../components/new-item/new-item.component';
import { DeleteConfirmComponent } from '../components/delete-confirm/delete-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DnAlertComponent } from '../components/dn-alert/dn-alert.component';

@Component({
  selector: 'app-document-types',
  standalone: true,
  imports: [ MatButtonModule,MatIconModule,MatPaginator,MatPaginatorModule,MatSort,MatSortModule, MatInputModule, MatFormFieldModule,MatTableModule,HttpClientModule,MatSortHeader,
  ],
  templateUrl: './document-types.component.html',
  styleUrl: './document-types.component.css'
})
export class DocumentTypesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['Name', 'Description', 'buttons'];
  dataSource: MatTableDataSource<DocumentTypeDto>;
  documentType: any;
  documentTypesViewModel: DocumentTypesViewModel;

constructor(private http:HttpClient, public dialog: MatDialog,   private _snackBar: MatSnackBar,

  ){
  this.documentTypesViewModel = new DocumentTypesViewModel(this.http)
}

ngAfterViewInit() {
this.getData();
}

getData(){
  this.documentTypesViewModel.GetAll().subscribe((result:any)=>{
    this.dataSource = new MatTableDataSource(result)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}
  editDocumentType(data:any){
    this.documentType=data;
    const dialogRef = this.dialog.open(NewItemComponent, {
      width: '500px',
      data: {
        title: 'Edit Item',
        name:this.documentType.Name
      },
    });
    dialogRef.afterClosed().subscribe((data) => {

      if (data) {
        this.updateItem(data);
      } else {
      }
    });
  }
  updateItem(data:any){
     this.documentType.Name = data
    this.documentTypesViewModel.UpdateDto(this.documentType).subscribe((result:any)=>{
      this.getData();
      this._snackBar.open('Record updated', '', {
        duration: 1000,
        panelClass: 'green-snackbar',
      });
    })
  }
  addDocumentType(e:any){
    const dialogRef = this.dialog.open(NewItemComponent, {
      width: '500px',
      data: {
        title: 'New Item',
      },
    });
    dialogRef.afterClosed().subscribe((data) => {

      if (data) {
        this.insertItem(data);
      } else {
      }
    });
  }

insertItem(data:any){
  let documentType = new DocumentTypeDto()
  documentType.Name = data
  this.documentTypesViewModel.InsertDto(documentType).subscribe((result:any)=>{
    this._snackBar.open('Record inserted', '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
    this.getData();

  })
}
  applyFilter(e:any){
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteDocumentType(data: any) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {
        title: 'Title',
        message: 'message',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.deleteItem(data);
      } else {
      }
    });
  }

  deleteItem(data: any) {
    this.documentTypesViewModel
    .DeleteById(data.Id)
    .subscribe({
    next: (result) => {
      this.getData();

      this._snackBar.open('Record deleted', '', {
        duration: 1000,
        panelClass: 'green-snackbar',
      });
    },
    error: (err) => {
      const dialog = this.dialog.open(DnAlertComponent, {
        data: {
          Title: 'Message',
          Message: err.error.innerExceptionMessage,
        },
      });
    },
  });
  }
}
