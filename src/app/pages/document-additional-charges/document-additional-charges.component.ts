import { Component, OnInit } from '@angular/core';
import { DnToolbarComponent } from '../components/dn-toolbar/dn-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentAdditionalChargeDto } from '../../dto/document-additional-charge.dto';
import { MatCell, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-additional-charges',
  standalone: true,
  imports: [MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatCell,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortHeader,
    DnToolbarComponent,
    MatTooltipModule,
    DnToolbarComponent,
    CommonModule
    ],
  templateUrl: './document-additional-charges.component.html',
  styleUrl: './document-additional-charges.component.css'
})
export class DocumentAdditionalChargesComponent implements OnInit{
  document_additionl_charges_text: string;
  displayedColumns:string[] =['ChargeName', 'Amount','buttons'];
  dataSource: DocumentAdditionalChargeDto[] = new Array<DocumentAdditionalChargeDto>;
  constructor(){
    for(let i=0;i<5; i++){
      this.dataSource[i] = new DocumentAdditionalChargeDto()
      this.dataSource[i].IsRowFilled = false;
    }
  }

  ngOnInit(): void {
    this.document_additionl_charges_text = "Additional Charges"
  }

  onCloseBtnClicked(e:any){

  }

  removeAdditionalCharge(e:any){

  }
  onInsertBtnClicked(e:any){
    this
  }
}
