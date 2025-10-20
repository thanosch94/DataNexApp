import { Component, OnInit } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { AuthService } from '../../../services/auth.service';
import { GeneralOptionsDto } from '../../../dto/configuration/general-options.dto';
import { DnCheckboxComponent } from '../../components/dn-checkbox/dn-checkbox.component';
import { BaseComponent } from '../../components/base/base.component';
import {
  GetAllGeneralOptions,
  InsertGeneralOptions,
  UpdateGeneralOptions,
} from '../../../state/parameters/general-options/general-options.actions';
import { selectAllGeneralOptions } from '../../../state/parameters/general-options/general-options.selectors';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-general-options',
  imports: [DnToolbarComponent, DnCheckboxComponent],
  templateUrl: './general-options.component.html',
  styleUrl: './general-options.component.css',
})
export class GeneralOptionsComponent extends BaseComponent implements OnInit {
  general_options_text: string = 'General Options';
  generalOptions: GeneralOptionsDto = new GeneralOptionsDto();
  private destroy$ = new Subject<void>();

  constructor(private auth: AuthService) {
    super();
    //General options is a single line of data in the database which is unique for each company
    //The first time someone accessing general options component if there are no options for the company
    ///we create them
  }

  ngOnInit() {
    this.setActionsResults();
    this.getOrInsertData();
  }

  getOrInsertData() {
    this.store.dispatch(GetAllGeneralOptions.action());
    this.store.select(selectAllGeneralOptions).subscribe((result: any) => {
        this.setGeneralOptions(result);
    });
    if (!this.generalOptions) {
      this.store.dispatch(
        InsertGeneralOptions.action({ dto: this.generalOptions })
      );
      this.store.select(selectAllGeneralOptions).subscribe((result: any) => {
        this.setGeneralOptions(result);
      });
    }
  }

  setGeneralOptions(data: any) {
    if(data[0]){
    this.auth.appOptions = { ...data[0] };
    this.generalOptions = this.auth.appOptions;
    }
  }

  onSaveClicked(e: any) {
    this.store.dispatch(
      UpdateGeneralOptions.action({ dto: this.generalOptions })
    );
  }

  onRefreshClicked(e: any) {
    this.getOrInsertData();
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertGeneralOptions.actionSuccess,
        insertFailure: InsertGeneralOptions.actionFailure,
        updateSuccess: UpdateGeneralOptions.actionSuccess,
        updateFailure: UpdateGeneralOptions.actionFailure,
      },
      {
        insertSuccess: (result: any) => {
          this.displayNotification('Record inserted');
          this.getOrInsertData();
        },
        insertFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateSuccess: () => {
          this.displayNotification('Record updated');
          this.getOrInsertData();
        },
        updateFailure: (result) => {
          this.displayErrorAlert(result.error);
        }
      },
      this.destroy$
    );
  }
  //#endregion
}
