import { TabsService } from './../../../services/tabs.service';
import { Component, OnInit, signal } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { ConnectorParametersDto } from '../../../dto/connector-parameters.dto';
import { ConnectorParametersViewModel } from '../../../view-models/connector-parameters.viewmodel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { faMagento, faOpencart, faShopify, faWordpress } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connector-parameters',
  standalone: true,
  imports: [
    DnToolbarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [TabsService],
  templateUrl: './connector-parameters.component.html',
  styleUrl: './connector-parameters.component.css',
})
export class ConnectorParametersComponent implements OnInit {
  connector_parameters_text: any;
  consumerKeyHide: boolean = true;
  consumerSecretHide: boolean = true;
  connectorParameters: ConnectorParametersDto;
  connectorParametersViewModel: ConnectorParametersViewModel;
  faWordpress = faWordpress;
    faMagento = faMagento;
    faShopify = faShopify;
    faOpenCart = faOpencart;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private tabsService: TabsService,
    private _snackBar:MatSnackBar,
    private router:Router
  ) {
    this.connectorParametersViewModel = new ConnectorParametersViewModel(
      this.http,
      this.auth
    );

    this.connector_parameters_text = 'Connector Parameters';
    tabsService.setTabName(this.connector_parameters_text);
  }

  ngOnInit() {
    //TODO change with GetByCompanyId when Company functionality will be added
    this.connectorParametersViewModel.GetAll().subscribe((result: any) => {
      if (result) {
        this.connectorParameters = result;
      } else {
        this.connectorParameters = new ConnectorParametersDto();
      }
    });
  }

  onCloseBtnClicked(e: any) {
    this.router.navigate(['connector-home']);
  }

  onConsumerKeyHideClick(e: any) {
    this.consumerKeyHide = !this.consumerKeyHide;
    e.stopPropagation();
  }
  onConsumerSecretHideClick(e: any) {
    this.consumerSecretHide = !this.consumerSecretHide;
    e.stopPropagation();
  }

  onSaveBtnClicked(e:any){
    if(this.connectorParameters.Id){
      this.connectorParametersViewModel.UpdateDto(this.connectorParameters).subscribe((result:any)=>{
        this._snackBar.open('Record updated', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
      })
    }else{
      this.connectorParametersViewModel.InsertDto(this.connectorParameters).subscribe((result:any)=>{
        this._snackBar.open('Record inserted', '', {
          duration: 1000,
          panelClass: 'green-snackbar',
        });
      })
    }
  }
}
