import { LotSettingsViewModel } from './../../../view-models/lot-settings.viewmodel';
import { Component, OnInit } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnSelectboxComponent } from '../../components/dn-selectbox/dn-selectbox.component';
import { LotStrategyEnumList } from '../../../enumLists/lot-strategy.enumlist';
import { LotSettingsDto } from '../../../dto/configuration/lot-settings.dto';
import { LotStrategyEnum } from 'c:/Local Code/DataNexApp/src/app/enums/lot-strategy.enum';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LotStrategyApplyFieldEnumList } from '../../../enumLists/lot-strategy-apply-field.enumlist';

@Component({
  selector: 'app-lots-settings',
  standalone: true,
  imports: [DnToolbarComponent, DnSelectboxComponent],
  templateUrl: './lots-settings.component.html',
  styleUrl: './lots-settings.component.css',
})
export class LotsSettingsComponent {
  lots_settings_title_text: string = 'Lots Settings';
  lotStrategiesList: { Id: LotStrategyEnum; Name: string }[];
  lotSettings: LotSettingsDto = new LotSettingsDto();
  lotSettingsViewModel: LotSettingsViewModel;
  lotStrategyApplyFieldsList: { Id: import("c:/Local Code/DataNexApp/src/app/enums/lot-strategy-apply-field.enum").LotStrategyApplyFieldEnum; Name: string; }[];
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.lotSettingsViewModel = new LotSettingsViewModel(this.http, this.auth);
    this.lotStrategiesList = LotStrategyEnumList.value;
    this.lotStrategyApplyFieldsList = LotStrategyApplyFieldEnumList.value
    //General options is a single line of data in the database which is unique for each company
    //The first time someone accessing general options component if there are no options for the company
    ///we create them
    this.getOrInsertData();
  }

  getOrInsertData() {
    this.lotSettingsViewModel.GetAll().subscribe((result: LotSettingsDto) => {
      next: {
        if (result) {
          this.lotSettings = result;
        } else {
          this.lotSettingsViewModel
            .InsertDto(this.lotSettings)
            .subscribe((result: LotSettingsDto) => {
              next: {
                this.lotSettings = result;
              }
              error: {
                console.log('Something went wrong inserting Lot Settings');
              }
            });
        }
      }
    });
  }

  onRefreshClicked(e: any) {
    this.getOrInsertData();
  }

  onSaveClicked(e: any) {
    this.lotSettingsViewModel
      .UpdateDto(this.lotSettings)
      .subscribe((result: LotSettingsDto) => {
        next: {
          this.displayNotification("Record updated")

          this.lotSettings = result;
        }
        error: {
          console.log('Something went wrong updating Lot Settings');
        }
      });
  }
  displayNotification(text: string) {
    this._snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
  }
}
