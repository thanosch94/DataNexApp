import { createReducer, on } from "@ngrx/store"
import { UserAppPermissionDto } from "../../dto/configuration/user-app-permission.dto"
import { DeleteUserAppPermissionByIdFailure, DeleteUserAppPermissionByIdSuccess, GetAllUserAppPermissions, GetAllUserAppPermissionsFailure, GetAllUserAppPermissionsSuccess, GetUserAppPermissionsByUserIdFailure, GetUserAppPermissionsByUserIdSuccess, InsertUserAppPermissionDtoFailure, InsertUserAppPermissionDtoSuccess, UpdateUserAppPermissionDtoFailure, UpdateUserAppPermissionDtoSuccess } from "./user-app-permissions.actions"

export interface UserAppPermissionsState {
  data:UserAppPermissionDto[],
  userPermissions:UserAppPermissionDto[],
  error:any
}

export const initialUserAppPermissionsState:UserAppPermissionsState ={
  data:[],
  userPermissions:[],
  error: null
}

export const userAppPermissionsReducer = createReducer(
  initialUserAppPermissionsState,
  on(GetAllUserAppPermissions, (state)=>({...state})),
  on(GetAllUserAppPermissionsSuccess, (state, {data})=>({
    ...state,
    userPermissions:data
  })),
  on(GetAllUserAppPermissionsFailure, (state, {error})=>({
    ...state,
    error
  })),
  on(GetUserAppPermissionsByUserIdSuccess, (state, {data})=>({
    ...state,
    data
  })),
  on(GetUserAppPermissionsByUserIdFailure, (state, {error})=>({
    ...state,
    error
  })),
  on(InsertUserAppPermissionDtoSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data, dto],
    error:null
  })),
  on(InsertUserAppPermissionDtoFailure, (state, {error})=>({
    ...state,
    error
  })),
  on(UpdateUserAppPermissionDtoSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==dto.Id?dto:x)],
    error:null
  })),
  on(UpdateUserAppPermissionDtoFailure, (state, {error})=>({
    ...state,
    error
  })
  ),
  on(DeleteUserAppPermissionByIdSuccess, (state,{dto})=>({
    ...state,
    data:[...state.data.filter(x=>x.Id!=dto.Id)],
    error:null
  })),
  on(DeleteUserAppPermissionByIdFailure, (state, {error} )=>({
    ...state,
    error
  }))
)
