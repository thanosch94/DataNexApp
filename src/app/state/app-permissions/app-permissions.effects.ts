import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { AppPermissionsService } from "../../services/app-permissions.service"
import { catchError, map, mergeMap, of } from "rxjs"
import { DeleteAppPermissionById, DeleteAppPermissionByIdFailure, DeleteAppPermissionByIdSuccess, GetAllAppPermissions, GetAllAppPermissionsFailure, GetAllAppPermissionsSuccess, GetAppPermissionsByEntityId, GetAppPermissionsByEntityIdFailure, GetAppPermissionsByEntityIdSuccess, InsertAppPermissionDto, InsertAppPermissionDtoFailure, InsertAppPermissionDtoSuccess, UpdateAppPermissionDto, UpdateAppPermissionDtoSuccess } from "./app-permissions.actions"

@Injectable()
export class AppPermissionsEffects {
  constructor(private appPermissionsService:AppPermissionsService, private actions$:Actions){

  }

  loadAppPermissions$ = createEffect(()=>
  this.actions$.pipe(
    ofType(GetAllAppPermissions),
    mergeMap(()=>
    this.appPermissionsService.GetAll().pipe(
      map((appPermissions:any)=>GetAllAppPermissionsSuccess({data:appPermissions})),
      catchError((error)=>{
        return of(GetAllAppPermissionsFailure({error}))
      })
    ))
  ))

  loadAppPermissionsByEntityId$ = createEffect(()=>
  this.actions$.pipe(
    ofType(GetAppPermissionsByEntityId),
    mergeMap((action:any)=>
    this.appPermissionsService.GetByEntityId(action.id).pipe(
      map((appPermissions:any)=>GetAppPermissionsByEntityIdSuccess({data:appPermissions})),
      catchError((error)=>{
        return of(GetAppPermissionsByEntityIdFailure({error}))
      })
    ))
  ))

  insertAppPermission$ = createEffect(()=>
  this.actions$.pipe(
    ofType(InsertAppPermissionDto),
    mergeMap((action:any)=>
    this.appPermissionsService.InsertDto(action.dto).pipe(
      map((insertedAppPermission:any)=>InsertAppPermissionDtoSuccess({dto:insertedAppPermission})),
      catchError((error)=>{
        return of(InsertAppPermissionDtoFailure({error}))
      })
    )
    )
  ))

  updateAppPermission$  =createEffect(()=>
  this.actions$.pipe(
    ofType(UpdateAppPermissionDto),
    mergeMap((action:any)=>
    this.appPermissionsService.UpdateDto(action.dto).pipe(
      map((updatedAppPermission:any)=>UpdateAppPermissionDtoSuccess({dto:updatedAppPermission})),
      catchError((error)=>{
        return of(DeleteAppPermissionByIdFailure({error}))
      })
    ))
  ))

  deleteAppPermission$ = createEffect(()=>
  this.actions$.pipe(
    ofType(DeleteAppPermissionById),
    mergeMap((action:any)=>
    this.appPermissionsService.DeleteById(action.id).pipe(
      map((deletedAppPermission:any)=>DeleteAppPermissionByIdSuccess({dto:deletedAppPermission})),
      catchError((error)=>{
        return of(DeleteAppPermissionByIdFailure({error}))
      })
    ))
  ))
}
