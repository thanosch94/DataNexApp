import { DnTextboxComponent } from './../../components/dn-textbox/dn-textbox.component';
import { Component, inject, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';
import { AppPermissionDto } from '../../../dto/configuration/app-permission.dto';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../components/base/base.component';
import { GetAllUsers } from '../../../state/users/users.actions';
import { selectAllUsers } from '../../../state/users/users.selectors';
import {
  DeleteAppPermissionById,
  DeleteAppPermissionByIdSuccess,
  InsertAppPermissionDto,
  InsertAppPermissionDtoSuccess,
} from '../../../state/app-permissions/app-permissions.actions';
import {
  DeleteUserAppPermissionById,
  DeleteUserAppPermissionByIdSuccess,
  InsertUserAppPermissionDto,
  InsertUserAppPermissionDtoSuccess,
} from '../../../state/user-app-permissions/user-app-permissions.actions';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { UserAppPermissionDto } from '../../../dto/configuration/user-app-permission.dto';
import { PermissionsListConnections } from '../../../base/permissions-list-connections';

@Component({
  selector: 'app-permissions',
  imports: [
    DnToolbarComponent,
    MatExpansionModule,
    MatIconModule,
    DnTextboxComponent,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatButtonModule,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './app-permissions.component.html',
  styleUrl: './app-permissions.component.css',
})
export class AppPermissionsComponent extends BaseComponent {
  data = signal<any>(null);

  //APP Permissions Component
  actions$ = inject(Actions);
  app_permissions_list_text:string = 'App Permissions'
  permissionsToInsert: AppPermissionDto[] = [];
  users: Observable<any[]>;

  async ngOnInit() {
    await this.getData();

    this.store.dispatch(GetAllUsers.action());
    this.users = this.store.select(selectAllUsers);
    this.setInsertUserAppPermissionDtoSuccessActionResult();
    this.setDeleteUserAppPermissionByIdSuccessActionResult();
    this.setDeleteAppPermissionByIdSuccessActionResult();
    this.setInsertAppPermissionDtoSuccessActionResult();
  }

  async getData(){
    const componentsList = PermissionsListConnections.components
    debugger

    let permissionsData: (any[] | undefined)[] = []
    for (const component of componentsList) {
      this.getComponentPermissions(component.PermissionsList, component.MasterEntityId) //Set the necessary data in base component

      let data = await this.getExportedData()
      permissionsData.push(data.Permissions![0])
    }

    debugger
    this.data.set(permissionsData)

  }

  setInsertAppPermissionDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(InsertAppPermissionDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record inserted');

        this.updateData(result, 'InsertAppPermission');
      });
  }
  setInsertUserAppPermissionDtoSuccessActionResult() {
    this.actions$
      .pipe(ofType(InsertUserAppPermissionDtoSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record inserted');

        this.updateData(result, 'InsertUserAppPermission');
      });
  }

  setDeleteUserAppPermissionByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteUserAppPermissionByIdSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.updateData(result, 'DeleteUserAppPermission');
      });
  }

  setDeleteAppPermissionByIdSuccessActionResult() {
    this.actions$
      .pipe(ofType(DeleteAppPermissionByIdSuccess))
      .subscribe((result: any) => {
        this.displayNotification('Record deleted');
        this.updateData(result, 'DeleteAppPermission');
      });
  }

  onAddPermissionBtnClicked(permission: any) {
    permission.Display = true; //Display Permission Name Field
    permission.IsNewPermission = true;
  }

  onCancelPermissionBtnClicked(permission: any) {
    permission.Display = false;
    permission.IsNewPermission = false;
  }

  onRemovePermissionBtnClicked(permission: any) {
    //Remove App Permission
    if (permission.IsNewPermission) {
      permission.IsNewPermission = false;
      permission.Display = false;
    }
    this.store.dispatch(DeleteAppPermissionById({ id: permission.Id }));
  }

  onSavePermissionBtnClicked(permission: any) {
    if (permission.Name && permission.Name != '') {
      //Add App Permission
      permission.IsNewPermission = false;
      this.store.dispatch(InsertAppPermissionDto({ dto: permission }));
    } else {
      this.dialog.open(DnAlertComponent, {
        width: '320px',
        data: {
          Title: 'Message',
          Message: 'Permission name is empty. Please write a name.',
        },
      });
    }
  }

  onUserChipRemoveClicked(userAppPermission: UserAppPermissionDto) {
    //Remove User App Permission
    this.store.dispatch(
      DeleteUserAppPermissionById({ id: userAppPermission.Id })
    );
  }

  onUserSelected(e: any, permissionItem: AppPermissionDto) {
    //Create User App Permission
    let userPermissionDto = new UserAppPermissionDto();
    userPermissionDto.UserId = e.option.value.Id;
    userPermissionDto.UserName = e.option.value.Name;
    userPermissionDto.AppPermissionId = permissionItem.Id!;

    //Add User App Permission
    this.store.dispatch(InsertUserAppPermissionDto({ dto: userPermissionDto }));
  }

  onRefreshClicked(e:any){

  }
  updateData(apiResult: any, method: string) {
    //Update signal data based on successful method executed
    this.data.update((current) =>
      current.map((perm: any) => ({
        ...perm,
        entities: perm.entities.map((item: any) => ({
          ...item,
          permissions: item.permissions.map((p: AppPermissionDto) => {
            if (
              p.Id ===
                (apiResult.dto.AppPermissionId
                  ? apiResult.dto.AppPermissionId
                  : apiResult.dto.Id) ||
              (p.MasterEntityId == apiResult.dto.MasterEntityId &&
                p.Key == apiResult.dto.Key)
            ) {
              return {
                ...p,
                Id:
                  method == 'DeleteAppPermission'
                    ? undefined
                    : method == 'InsertAppPermission'
                    ? apiResult.dto.Id
                    : p.Id,
                Name:
                  method == 'DeleteAppPermission'
                    ? ''
                    : method == 'InsertAppPermission'
                    ? apiResult.dto.Name
                    : p.Name,
                UserAppPermissions:
                  method == 'InsertUserAppPermission'
                    ? [
                        ...(p.UserAppPermissions ? p.UserAppPermissions : []),
                        apiResult.dto,
                      ]
                    : method == 'DeleteUserAppPermission'
                    ? [
                        ...(p.UserAppPermissions
                          ? p.UserAppPermissions
                          : []
                        ).filter((x: any) => x.Id != apiResult.dto.Id),
                      ]
                    : method == 'InsertAppPermission'
                    ? apiResult.dto.UserAppPermissions
                    : [],
              };
            }
            return p;
          }),
        })),
      })),
    );
  }
}
