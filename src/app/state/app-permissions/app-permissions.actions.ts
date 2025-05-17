import { createAction, props } from "@ngrx/store"
import { AppPermissionDto } from "../../dto/configuration/app-permission.dto"
import { Guid } from "guid-typescript"

//Get All
export const GetAllAppPermissions = createAction('[App Permissions List] GetAll')

export const GetAllAppPermissionsSuccess = createAction('[App Permissions List] GetAll Success', props<{data:AppPermissionDto[]}>())

export const GetAllAppPermissionsFailure = createAction('[App Permissions List] GetAll Failure', props<{error:string}>())

//Get By Entity Id
export const GetAppPermissionsByEntityId = createAction('[App Permissions] Get By Entity Id', props<{id:Guid}>())

export const GetAppPermissionsByEntityIdSuccess = createAction('[App Permissions] Get By Entity Id Success', props<{ data: AppPermissionDto[]}>());

export const GetAppPermissionsByEntityIdFailure = createAction('[App Permissions] Get By Entity Id Failure', props<{ error: string }>());

//InsertDto
export const InsertAppPermissionDto = createAction('[App Permissions List] InsertDto', props<{dto:AppPermissionDto}>())

export const InsertAppPermissionDtoSuccess = createAction('[App Permissions List] InsertDto Success', props<{dto:AppPermissionDto}>())

export const InsertAppPermissionDtoFailure = createAction('[App Permissions List] InsertDto Failure', props<{error:string}>())


//UpdateDto
export const UpdateAppPermissionDto = createAction('[App Permissions List] UpdateDto', props<{dto:AppPermissionDto}>())

export const UpdateAppPermissionDtoSuccess = createAction('[App Permissions List] UpdateDto Success', props<{dto:AppPermissionDto}>())

export const UpdateAppPermissionDtoFailure = createAction('[App Permissions List] UpdateDto Failure', props<{error:string}>())

//DeleteById

export const DeleteAppPermissionById = createAction('[App Permissions List] DeleteById', props<{id:Guid}>())

export const DeleteAppPermissionByIdSuccess = createAction('[App Permissions List] DeleteById Success', props<{dto:AppPermissionDto}>())

export const DeleteAppPermissionByIdFailure = createAction('[App Permissions List] DeleteById Failure ', props<{error:string}>())

