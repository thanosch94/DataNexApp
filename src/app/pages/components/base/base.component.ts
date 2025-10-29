import { StateHelperService } from './../../../services/state-helper.service';
import { Component, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DnAlertComponent } from '../dn-alert/dn-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, isObservable, Observable, of, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { AppPermissionDto } from '../../../dto/configuration/app-permission.dto';
import { AppEntityEnum } from '../../../enums/app-entity.enum';
import { selectAppPermissionsByEntityId } from '../../../state/app-permissions/app-permissions.selectors';
import {
  selectUserAppPermissionsByUserId,
} from '../../../state/user-app-permissions/user-app-permissions.selectors';
import { UserAppPermissionDto } from '../../../dto/configuration/user-app-permission.dto';
import { WebAppBase } from '../../../base/web-app-base';
import { TabsService } from '../../../services/tabs.service';

@Component({
  selector: 'app-base',
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class BaseComponent {
  protected snackBar: MatSnackBar = inject(MatSnackBar);
  protected dialog: MatDialog = inject(MatDialog);
  protected tabsService: TabsService = inject(TabsService);

  protected devToolsData: Object;
  protected permissions: any[];
  protected store: Store = inject(Store);
  protected stateHelperService:StateHelperService = inject(StateHelperService);
  componentPermissions: AppPermissionDto[];
  componentId: string | Guid;


    protected setPostActionsResults(
    actionsMap: { [key: string]: any },
    callbacks: { [key: string]: (result:any) => void },
    destroy$: Subject<void>
  ) {
    for (const key in actionsMap) {
      const action = actionsMap[key];
      const callback = callbacks[key];
      if (action && callback && this.stateHelperService) {
        this.stateHelperService
          .setActionResult(action, destroy$)
          .subscribe((result: any) => callback(result));
      }
    }
  }



  displayNotification(text: string) {
    this.snackBar.open(text, '', {
      duration: 1000,
      panelClass: 'green-snackbar',
    });
  }

  displayErrorAlert(error: any) {
    let errorMessage;
    if (error?.error?.innerExceptionMessage) {
      errorMessage = error.error?.innerExceptionMessage;
    } else if(error.error) {
      errorMessage = error.error;
    }else if(error.message) {
      errorMessage = error.message;
    }else{
      errorMessage = error.error;

    }
    const dialog = this.dialog.open(DnAlertComponent, {
      data: {
        Title: 'Message',
        Message: errorMessage,
      },
    });
  }

  stripHtml(html: string): string {
    const div = document.createElement('span');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  //It is called in App Component uses its data to display them in the DevTools
  async getExportedData(nested?: any[]) {
    const data: { ComponentData: Array<any>; Permissions?: Array<any> } = {
      //Add To DEV Tools Component Id
      ComponentData: [],
      Permissions: [],
    };
    let nestedData = { ComponentData: [], Permissions: [] };

    const keys = (this as any).__exportProps__ || [];
    if (nested) {
      for (const comp of nested) {
        nestedData = await comp.getExportedData();
      }
    }

    for (const key of keys) {
      const value = (this as any)[key];
      let obj: any = {};

      if (typeof value == 'function') {
        obj[key] = value();
      } else if (Array.isArray(value)) {
        obj[key] = value;
      } else if (isObservable(value)) {
        obj[key] = firstValueFrom(value);
      } else {
        obj[key] = value;
      }

      data.ComponentData.push(obj);
    }

    // //Based on the Key we merge the initial empty array of permissions and the one received from the api
    let permissions$ = this.store.select(
      selectAppPermissionsByEntityId(this.componentId)
    );
    let apiPermissions = (await firstValueFrom(
      permissions$
    )) as Array<AppPermissionDto>;

    this.permissions = this.mergeArrays(
      this.componentPermissions,
      apiPermissions,
      'Key'
    );

    this.permissions = this.groupByScreenAndEntityType(this.permissions);

    data.Permissions = [...(this.permissions ?? []), ...nestedData.Permissions];
    data.ComponentData = [...data.ComponentData, ...nestedData.ComponentData];
    return data;
  }

  //Get Component's Permisions by Entity Id (Enum and UserSet Permission Code And Name)
  async getComponentPermissions(
    permissionsList: Array<AppPermissionDto>,
    masterEntityId: Guid | string
  ) {
    this.componentPermissions = permissionsList;
    this.componentId = masterEntityId;

    return this.componentPermissions;
  }

  mergeArrays(
    baseArray: AppPermissionDto[],
    overrideArray: AppPermissionDto[],
    key: keyof AppPermissionDto
  ) {
    const overrideMap = new Map(overrideArray.map((item) => [item[key], item]));
    return baseArray.map((item) => {
      return overrideMap.has(item[key]) &&
        overrideMap.get(item[key])?.MasterEntityId == item.MasterEntityId
        ? overrideMap.get(item[key])
        : item;
    });
  }

  // groupByEntityType(data: any[]): { appEntity: string, permissions: any[] }[] {
  //   const map = new Map<string, any[]>();
  //   for (const item of data) {
  //     const appEntity = item.AppEntity;
  //     if (!map.has(AppEntityEnum[appEntity])) {
  //       map.set(AppEntityEnum[appEntity], []);
  //     }
  //     map.get(AppEntityEnum[appEntity])!.push(item);
  //   }

  //   let newArray = Array.from(map.entries()).map(([appEntity, permissions]) => ({ appEntity, permissions }));

  //   return newArray;
  // }

  groupByScreenAndEntityType(data: AppPermissionDto[]): {
    masterEntityDescr: string | undefined;
    entities: { appEntity: string; permissions: AppPermissionDto[] }[];
  }[] {
    const screenMap = new Map<string | undefined, AppPermissionDto[]>();

    // Πρώτο grouping: κατά masterEntityDescr
    for (const item of data) {
      const masterEntityDescr = item.MasterEntityDescr;
      if (!screenMap.has(masterEntityDescr)) {
        screenMap.set(masterEntityDescr, []);
      }
      screenMap.get(masterEntityDescr)!.push(item);
    }

    const result = Array.from(screenMap.entries()).map(
      ([masterEntityDescr, items]) => {
        const entityMap = new Map<string, any[]>();

        // Δεύτερο grouping: κατά AppEntity
        for (const item of items) {
          const appEntityKey = AppEntityEnum[item.AppEntity];
          if (!entityMap.has(appEntityKey)) {
            entityMap.set(appEntityKey, []);
          }
          entityMap.get(appEntityKey)!.push(item);
        }

        const entities = Array.from(entityMap.entries()).map(
          ([appEntity, permissions]) => ({
            appEntity,
            permissions,
          })
        );

        return { masterEntityDescr, entities };
      }
    );

    return result;
  }
  //Checks if the user has the permission required
  //@param value: The name of the permission set in the code
  //This will find if any the code from this.permissions and returns true else false
  async hasPermission(value: string) {
    let appPermissions$ = this.store.select(
      selectAppPermissionsByEntityId(this.componentId)
    );
    let appPermissionsList = (await firstValueFrom(appPermissions$)) as any;

    let userPermission$ = this.store.select(
      selectUserAppPermissionsByUserId(WebAppBase.UserId)
    );
    let userPermissionsList = (await firstValueFrom(userPermission$)) as any;
    let permissionToCheck = appPermissionsList.find(
      (x: any) => x.Key == value && x.MasterEntityId == this.componentId
    );


    if (permissionToCheck?.Id) {
      if (
        userPermissionsList.some(
          (x: UserAppPermissionDto) => x.AppPermissionId == permissionToCheck.Id
        )
      ) {
        return true;
      } else {
        return false;
      }
    }else{
      return null
    }
    //if there is value in the table returns the value else null
    // if (this.permissions.includes(value)) {
    // } else {
    //   return null;
    // }
  }

}
