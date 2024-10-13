import { DocumentTypesViewModel } from './../../../view-models/document-types.viewmodel';
import { Component, OnInit } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { DnTextboxComponent } from "../../components/dn-textbox/dn-textbox.component";
import { DocumentTypeDto } from '../../../dto/document-type.dto';
import { Guid } from 'guid-typescript';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { DnCheckboxComponent } from '../../components/dn-checkbox/dn-checkbox.component';

@Component({
  selector: 'app-document-type-edit',
  standalone: true,
  imports: [DnToolbarComponent, MatTabsModule, DnTextboxComponent,DnCheckboxComponent],
  templateUrl: './document-type-edit.component.html',
  styleUrl: './document-type-edit.component.css'
})
export class DocumentTypeEditComponent implements OnInit {
  document_type_edit_title_text: string
  documentType:DocumentTypeDto = new DocumentTypeDto()
  documentTypeId:Guid;
  documentTypesViewModel: DocumentTypesViewModel;
  constructor(private http:HttpClient, private auth:AuthService, private router:Router, private route:ActivatedRoute) {
    this.documentTypesViewModel = new DocumentTypesViewModel(this.http, this.auth)
    this.route.queryParams.subscribe((params: any) => {
      debugger
      this.documentTypeId = params['id'];
      this.documentTypesViewModel.GetById(this.documentTypeId).subscribe((result:any)=>{
        this.documentType = result
      })
    });
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(){

  }

  onCloseBackClicked(e:any){
    this.router.navigate(["document-types-list"])
  }

  onRefreshClicked(e:any){
    this.getData()
  }
}
