import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagento,
  faOpencart,
  faShopify,
  faWordpress,
} from '@fortawesome/free-brands-svg-icons';
import { MatCardModule } from '@angular/material/card';
import {
  faDatabase,
  faFileCsv,
  faFileExcel,
  faGear,
  faNetworkWired,
} from '@fortawesome/free-solid-svg-icons';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connector-home',
  standalone: true,
  imports: [FontAwesomeModule, MatCardModule, DnToolbarComponent],
  templateUrl: './connector-home.component.html',
  styleUrl: './connector-home.component.css',
})
export class ConnectorHomeComponent {
  faWordpress = faWordpress;
  faMagento = faMagento;
  faShopify = faShopify;
  faOpenCart = faOpencart;
  faNetworkWired = faNetworkWired;
  faFileExcel = faFileExcel;
  faFileCsv = faFileCsv;
  faGear = faGear
  faDatabase = faDatabase
  connector_text: string;

  constructor(private router:Router) {
    this.connector_text = 'Connector';
  }

  onCloseBtnClicked(e:any){

  }

  onParametersClick(e:any){
    this.router.navigate(["/connector-parameters"])
  }

  onDataSourcesConfigurationClick(e:any){
    this.router.navigate(["/connector-datasources-options"])
  }
}
