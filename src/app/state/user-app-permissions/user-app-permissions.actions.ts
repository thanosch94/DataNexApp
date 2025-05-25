import { createAction, props } from "@ngrx/store"
import { Guid } from "guid-typescript"
import { UserAppPermissionDto } from "../../dto/configuration/user-app-permission.dto"

//Get All
export const GetAllUserAppPermissions = createAction('[User App Permissions List] GetAll')

export const GetAllUserAppPermissionsSuccess = createAction('[User App Permissions List] GetAll Success', props<{data:UserAppPermissionDto[]}>())

export const GetAllUserAppPermissionsFailure = createAction('[User App Permissions List] GetAll Failure', props<{error:string}>())

//Get By User Id
export const GetUserAppPermissionsByUserId = createAction('[User App Permissions] Get By User Id', props<{id:Guid}>())

export const GetUserAppPermissionsByUserIdSuccess = createAction('[User App Permissions] Get By User Id Success', props<{ data: UserAppPermissionDto[]}>());

export const GetUserAppPermissionsByUserIdFailure = createAction('[User App Permissions] Get By User Id Failure', props<{ error: string }>());

//InsertDto
export const InsertUserAppPermissionDto = createAction('[User App Permissions List] InsertDto', props<{dto:UserAppPermissionDto}>())

export const InsertUserAppPermissionDtoSuccess = createAction('[User App Permissions List] InsertDto Success', props<{dto:UserAppPermissionDto}>())

export const InsertUserAppPermissionDtoFailure = createAction('[User App Permissions List] InsertDto Failure', props<{error:string}>())


//UpdateDto
export const UpdateUserAppPermissionDto = createAction('[User App Permissions List] UpdateDto', props<{dto:UserAppPermissionDto}>())

export const UpdateUserAppPermissionDtoSuccess = createAction('[User App Permissions List] UpdateDto Success', props<{dto:UserAppPermissionDto}>())

export const UpdateUserAppPermissionDtoFailure = createAction('[User App Permissions List] UpdateDto Failure', props<{error:string}>())

//DeleteById

export const DeleteUserAppPermissionById = createAction('[User App Permissions List] DeleteById', props<{id:Guid}>())

export const DeleteUserAppPermissionByIdSuccess = createAction('[User App Permissions List] DeleteById Success', props<{dto:UserAppPermissionDto}>())

export const DeleteUserAppPermissionByIdFailure = createAction('[User App Permissions List] DeleteById Failure ', props<{error:string}>())

