import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import { DeleteUserById, DeleteUserByIdFailure, DeleteUserByIdSuccess, GetAllUsers, GetAllUsersFailure, GetAllUsersSuccess, GetUserById, GetUserByIdFailure, GetUserByIdSuccess, InsertUserDto, InsertUserDtoFailure, InsertUserDtoSuccess, UpdateUserDto, UpdateUserDtoFailure, UpdateUserDtoSuccess } from "./users.actions";
import { UsersService } from "../../services/users.service";

@Injectable()
export class UsersEffects {
  constructor(
    private usersService: UsersService,
    private actions$: Actions
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllUsers),
      mergeMap(() =>
        this.usersService.GetAll().pipe(
          map((users: any) =>
            GetAllUsersSuccess({ data: users })
          ),
          catchError((error) => {
            return of(GetAllUsersFailure({ error }));
          })
        )
      )
    )
  );

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetUserById),
      mergeMap((action:any) =>
        this.usersService.GetById(action.id).pipe(
          map((user: any) =>
            GetUserByIdSuccess({ data: user })
          ),
          catchError((error) => {
            return of(GetUserByIdFailure({ error }));
          })
        )
      )
    )
  );

  insertUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertUserDto),
      mergeMap((action: any) =>
        this.usersService.InsertDto(action.dto).pipe(
          map((insertedUser: any) =>
            InsertUserDtoSuccess({ dto: insertedUser })
          ),
          catchError((error) => {
            return of(InsertUserDtoFailure({ error }));
          })
        )
      )
    )
  );

  updateUserDto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateUserDto),
      mergeMap((action: any) =>
        this.usersService.UpdateDto(action.dto).pipe(
          map((updatedUser: any) =>
            UpdateUserDtoSuccess({ dto: updatedUser })
          ),
          catchError((error) => {
            return of(UpdateUserDtoFailure({ error }));
          })
        )
      )
    )
  );

  deleteUserById$ = createEffect(()=>
  this.actions$.pipe(
    ofType(DeleteUserById),
    mergeMap((action:any)=>
    this.usersService.DeleteById(action.id).pipe(
      map((deletedUser:any)=>DeleteUserByIdSuccess({dto:deletedUser})),
      catchError((error)=>{
        return of(DeleteUserByIdFailure({error}))
      })
    ))
  ))
}
