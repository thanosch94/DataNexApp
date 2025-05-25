import { createReducer, on } from '@ngrx/store';
import { AppPermissionDto } from '../../dto/configuration/app-permission.dto';
import {
  DeleteAppPermissionByIdFailure,
  DeleteAppPermissionByIdSuccess,
  GetAllAppPermissions,
  GetAllAppPermissionsFailure,
  GetAllAppPermissionsSuccess,
  InsertAppPermissionDtoFailure,
  InsertAppPermissionDtoSuccess,
  UpdateAppPermissionDtoFailure,
  UpdateAppPermissionDtoSuccess,
} from './app-permissions.actions';
import {
  DeleteUserAppPermissionByIdSuccess,
  InsertUserAppPermissionDtoSuccess,
} from '../user-app-permissions/user-app-permissions.actions';

export interface AppPermissionsState {
  data: AppPermissionDto[];
  error: any;
}

export const initialAppPermissionsState: AppPermissionsState = {
  data: [],
  error: null,
};

export const appPermissionsReducer = createReducer(
  initialAppPermissionsState,
  on(GetAllAppPermissions, (state) => ({ ...state })),
  on(GetAllAppPermissionsSuccess, (state, { data }) => ({
    ...state,
    data,
  })),
  on(GetAllAppPermissionsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(InsertAppPermissionDtoSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data, dto],
    error: null,
  })),
  on(InsertAppPermissionDtoFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UpdateAppPermissionDtoSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data.map((x) => (x.Id == dto.Id ? dto : x))],
    error: null,
  })),
  on(UpdateAppPermissionDtoFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(DeleteAppPermissionByIdSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data.filter((x) => x.Id != dto.Id)],
    error: null,
  })),
  on(DeleteAppPermissionByIdFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(InsertUserAppPermissionDtoSuccess, (state, { dto }) => ({
    ...state,
    data: state.data.map((item) =>
      item.Id === dto.AppPermissionId
        ? {
            ...item,
            UserAppPermissions: [...(item.UserAppPermissions || []), dto],
          }
        : item
    ),
    error: null,
  })),

  on(DeleteUserAppPermissionByIdSuccess, (state, { dto }) => ({
    ...state,
    data: state.data.map((item) =>
      item.Id == dto.AppPermissionId
        ? {
            ...item,
            UserAppPermissions: [
              ...(item.UserAppPermissions?.filter((x: any) => x.Id != dto.Id) ||
                []),
            ],
          }
        : item
    ),
    error: null,
  }))
);
