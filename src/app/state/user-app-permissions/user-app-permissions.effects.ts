import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, mergeMap, of } from "rxjs"
import { DeleteUserAppPermissionById, DeleteUserAppPermissionByIdFailure, DeleteUserAppPermissionByIdSuccess, GetAllUserAppPermissions, GetAllUserAppPermissionsFailure, GetAllUserAppPermissionsSuccess, GetUserAppPermissionsByUserId, GetUserAppPermissionsByUserIdFailure, GetUserAppPermissionsByUserIdSuccess, InsertUserAppPermissionDto, InsertUserAppPermissionDtoFailure, InsertUserAppPermissionDtoSuccess, UpdateUserAppPermissionDto, UpdateUserAppPermissionDtoFailure, UpdateUserAppPermissionDtoSuccess } from "./user-app-permissions.actions"
import { UserAppPermissionsService } from "../../services/user-app-permissions.service"

@Injectable()
export class UserAppPermissionsEffects {
  constructor(private userAppPermissionsService:UserAppPermissionsService, private actions$:Actions){

  }

  loadUserAppPermissions$ = createEffect(()=>
  this.actions$.pipe(
    ofType(GetAllUserAppPermissions),
    mergeMap(()=>
    this.userAppPermissionsService.GetAll().pipe(
      map((userAppPermissions:any)=>GetAllUserAppPermissionsSuccess({data:userAppPermissions})),
      catchError((error)=>{
        return of(GetAllUserAppPermissionsFailure({error}))
      })
    ))
  ))

  loadUserAppPermissionsByUserId$ = createEffect(()=>
  this.actions$.pipe(
    ofType(GetUserAppPermissionsByUserId),
    mergeMap((action:any)=>
    this.userAppPermissionsService.GetByUserId(action.id).pipe(
      map((userAppPermissions:any)=>GetUserAppPermissionsByUserIdSuccess({data:userAppPermissions})),
      catchError((error)=>{
        return of(GetUserAppPermissionsByUserIdFailure({error}))
      })
    ))
  ))

  insertUserAppPermission$ = createEffect(()=>
  this.actions$.pipe(
    ofType(InsertUserAppPermissionDto),
    mergeMap((action:any)=>
    this.userAppPermissionsService.InsertDto(action.dto).pipe(
      map((insertedUserAppPermission:any)=>InsertUserAppPermissionDtoSuccess({dto:insertedUserAppPermission})),
      catchError((error)=>{
        return of(InsertUserAppPermissionDtoFailure({error}))
      })
    )
    )
  ))

  updateUserAppPermission$ =createEffect(()=>
  this.actions$.pipe(
    ofType(UpdateUserAppPermissionDto),
    mergeMap((action:any)=>
    this.userAppPermissionsService.UpdateDto(action.dto).pipe(
      map((updatedUserAppPermission:any)=>UpdateUserAppPermissionDtoSuccess({dto:updatedUserAppPermission})),
      catchError((error)=>{
        return of(UpdateUserAppPermissionDtoFailure({error}))
      })
    ))
  ))

  deleteUserAppPermission$ = createEffect(()=>
  this.actions$.pipe(
    ofType(DeleteUserAppPermissionById),
    mergeMap((action:any)=>
    this.userAppPermissionsService.DeleteById(action.id).pipe(
      map((deleteduserAppPermission:any)=>DeleteUserAppPermissionByIdSuccess({dto:deleteduserAppPermission})),
      catchError((error)=>{
        return of(DeleteUserAppPermissionByIdFailure({error}))
      })
    ))
  ))
}
