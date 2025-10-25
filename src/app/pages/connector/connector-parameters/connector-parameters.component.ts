import { TabsService } from './../../../services/tabs.service';
import { Component, OnInit } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { ConnectorParametersDto } from '../../../dto/connector-parameters.dto';
import {
  faMagento,
  faOpencart,
  faShopify,
  faWordpress,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { BaseComponent } from '../../components/base/base.component';
import {
  GetAllCntorParameters,
  InsertCntorParameters,
  UpdateCntorParameters,
} from '../../../state/parameters/cntor-parameters/cntor-parameters.actions';
import { selectAllCntorParameters } from '../../../state/parameters/cntor-parameters/cntor-parameters.selectors';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-connector-parameters',
  imports: [
    DnToolbarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [TabsService],
  templateUrl: './connector-parameters.component.html',
  styleUrl: './connector-parameters.component.css',
})
export class ConnectorParametersComponent
  extends BaseComponent
  implements OnInit
{
  connector_parameters_text: string;
  consumerKeyHide: boolean = true;
  consumerSecretHide: boolean = true;
  connectorParameters: ConnectorParametersDto;
  faWordpress = faWordpress;
  faMagento = faMagento;
  faShopify = faShopify;
  faOpenCart = faOpencart;
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {
    super();
    this.connector_parameters_text = 'Connector Parameters';
    this.tabsService.setTabName(this.connector_parameters_text);
  }

  ngOnInit() {
    this.setActionsResults();
    //TODO change with GetByCompanyId when Company functionality will be added
    this.store.dispatch(GetAllCntorParameters.action());
    this.store.select(selectAllCntorParameters).subscribe((result: any) => {
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

  onSaveBtnClicked(e: any) {
    if (this.connectorParameters.Id) {
      this.store.dispatch(
        UpdateCntorParameters.action({ dto: this.connectorParameters })
      );
    } else {
      this.store.dispatch(
        InsertCntorParameters.action({ dto: this.connectorParameters })
      );
    }
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertCntorParameters.actionSuccess,
        insertFailure: InsertCntorParameters.actionFailure,
        updateSuccess: UpdateCntorParameters.actionSuccess,
        updateFailure: UpdateCntorParameters.actionFailure,
      },
      {
        insertSuccess: () => {
          this.displayNotification('Record inserted');
        },
        insertFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateSuccess: () => {
          this.displayNotification('Record updated');
        },
        updateFailure: (result) => {
          this.displayErrorAlert(result.error);
        }
      },
      this.destroy$
    );
  }
  //#endregion

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
