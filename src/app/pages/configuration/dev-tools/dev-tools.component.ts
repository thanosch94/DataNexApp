import { BaseComponent } from './../../components/base/base.component';
import { UserAppPermissionDto } from './../../../dto/configuration/user-app-permission.dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DnToolbarComponent } from '../../components/dn-toolbar/dn-toolbar.component';
import { DnPopupComponent } from '../../components/dn-popup/dn-popup.component';
import { CommonModule, JsonPipe, AsyncPipe } from '@angular/common';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { DnTextboxComponent } from '../../components/dn-textbox/dn-textbox.component';
import { MatButtonModule } from '@angular/material/button';
import { AppPermissionDto } from '../../../dto/configuration/app-permission.dto';
import {
  DeleteAppPermissionById,
  DeleteAppPermissionByIdSuccess,
  InsertAppPermissionDto,
  InsertAppPermissionDtoSuccess,
} from '../../../state/app-permissions/app-permissions.actions';
import { MatChipsModule } from '@angular/material/chips';
import {
  DeleteUserAppPermissionById,
  DeleteUserAppPermissionByIdSuccess,
  InsertUserAppPermissionDto,
  InsertUserAppPermissionDtoSuccess,
} from '../../../state/user-app-permissions/user-app-permissions.actions';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { GetAllUsers } from '../../../state/users/users.actions';
import { selectAllUsers } from '../../../state/users/users.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { MatExpansionModule } from '@angular/material/expansion';
import { DnAlertComponent } from '../../components/dn-alert/dn-alert.component';
import { DnTextareaComponent } from "../../components/dn-textarea/dn-textarea.component";

@Component({
  selector: 'app-dev-tools',
  imports: [
    DnToolbarComponent,
    MatExpansionModule,
    AsyncPipe,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    CommonModule,
    DnPopupComponent,
    JsonPipe,
    MatTabGroup,
    MatTabsModule,
    MatIconModule,
    DnTextboxComponent,
    MatButtonModule,
    DnTextareaComponent
],
  templateUrl: './dev-tools.component.html',
  styleUrl: './dev-tools.component.css',
})
export class DevToolsComponent extends BaseComponent implements OnInit {
  displayDevToolsPopup = signal<boolean>(false);
  dev_tools_title_text: string = 'Dev Tools';
  data = signal<any>(null);
  codeSnip:string;
  //APP Permissions Component
  actions$ = inject(Actions);

  permissionsToInsert: AppPermissionDto[] = [];
  users: Observable<any[]>;

  ngOnInit(): void {
    this.store.dispatch(GetAllUsers.action());
    this.users = this.store.select(selectAllUsers);

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
  open(data: any) {
    this.data.set(data);
    this.displayDevToolsPopup.set(true);
  }

  close(data: any) {
    this.data.set(null);
    this.displayDevToolsPopup.set(false);
  }

  refresh(e: any) {}

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

  updateData(apiResult: any, method: string) {
    //Update signal data based on successful method executed
    this.data.update((current) => ({
      ...current,
      Permissions: current.Permissions.map((perm: any) => ({
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
    }));
  }

  clickTest(){
    // eval(this.codeSnip)
  }
}
