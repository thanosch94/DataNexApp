import { Component, OnInit } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnSelectboxComponent } from '../../components/dn-selectbox/dn-selectbox.component';
import { LotStrategyEnumList } from '../../../enumLists/lot-strategy.enumlist';
import { LotSettingsDto } from '../../../dto/configuration/lot-settings.dto';
import { LotStrategyEnum } from '../../../enums/lot-strategy.enum';
import { LotStrategyApplyFieldEnumList } from '../../../enumLists/lot-strategy-apply-field.enumlist';
import { BaseComponent } from '../../components/base/base.component';
import {
  GetAllLotSettings,
  InsertLotSettings,
  UpdateLotSettings,
} from '../../../state/parameters/lot-settings/lot-settings.actions';
import { selectAllLotSettings } from '../../../state/parameters/lot-settings/lot-settings.selectors';
import { LotStrategyApplyFieldEnum } from '../../../enums/lot-strategy-apply-field.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lots-settings',
  imports: [DnToolbarComponent, DnSelectboxComponent],
  templateUrl: './lots-settings.component.html',
  styleUrl: './lots-settings.component.css',
})
export class LotsSettingsComponent extends BaseComponent implements OnInit {
  lots_settings_title_text: string = 'Lots Settings';
  lotStrategiesList: { Id: LotStrategyEnum; Name: string }[];
  lotSettings: LotSettingsDto = new LotSettingsDto();
  private destroy$ = new Subject<void>();

  lotStrategyApplyFieldsList: {
    Id: LotStrategyApplyFieldEnum;
    Name: string;
  }[];
  constructor() {
    super();
    //General options is a single line of data in the database which is unique for each company
    //The first time someone accessing general options component if there are no options for the company
    ///we create them
  }

  ngOnInit(){
    this.getLookups()
    this.setActionsResults()
    this.getData();
  }

  getLookups(){
    this.lotStrategiesList = LotStrategyEnumList.value;
    this.lotStrategyApplyFieldsList = LotStrategyApplyFieldEnumList.value;
  }

  getData() {
    this.store.dispatch(GetAllLotSettings.action());
    this.store
      .select(selectAllLotSettings)
      .subscribe((result: LotSettingsDto[]) => {
        if (result.length > 0) {
          this.lotSettings = { ...result[0] };
        }
      });
  }

  onRefreshClicked(e: any) {
    this.getData();
  }

  onSaveClicked(e: any) {
    if (this.lotSettings.Id) {
      this.store.dispatch(UpdateLotSettings.action({ dto: this.lotSettings }));
    } else {
      this.store.dispatch(InsertLotSettings.action({ dto: this.lotSettings }));
    }
  }

  //#region Actions Results
  setActionsResults() {
    this.setPostActionsResults(
      {
        insertSuccess: InsertLotSettings.actionSuccess,
        insertFailure: InsertLotSettings.actionFailure,
        updateSuccess: UpdateLotSettings.actionSuccess,
        updateFailure: UpdateLotSettings.actionFailure,
      },
      {
        insertSuccess: () => {
          this.displayNotification('Record inserted');
          this.getData();
        },
        insertFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
        updateSuccess: () => {
          this.displayNotification('Record updated');
          this.getData();
        },
        updateFailure: (result) => {
          this.displayErrorAlert(result.error);
        },
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
