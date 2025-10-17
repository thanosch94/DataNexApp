import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import {
  DeleteUser,
  GetAllUsers,
  GetUserById,
  InsertUser,
  UpdateUser,
} from './users.actions';
import { UsersService } from '../../services/users.service';

@Injectable()
export class UsersEffects {
  constructor(private usersService: UsersService, private actions$: Actions) {}

  getAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllUsers.action),
      mergeMap(() =>
        this.usersService.GetAll().pipe(
          map((users: any) => GetAllUsers.actionSuccess({ data: users })),
          catchError((error) => {
            return of(GetAllUsers.actionFailure({ error }));
          })
        )
      )
    )
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetUserById.action),
      mergeMap((action: any) =>
        this.usersService.GetById(action.id).pipe(
          map((user: any) => GetUserById.actionSuccess({ dto: user })),
          catchError((error) => {
            return of(GetUserById.actionFailure({ error }));
          })
        )
      )
    )
  );

  insertUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertUser.action),
      mergeMap((action: any) =>
        this.usersService.InsertDto(action.dto).pipe(
          map((insertedUser: any) =>
            InsertUser.actionSuccess({ dto: insertedUser })
          ),
          catchError((error) => {
            return of(InsertUser.actionFailure({ error }));
          })
        )
      )
    )
  );

  updateUserDto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateUser.action),
      mergeMap((action: any) =>
        this.usersService.UpdateDto(action.dto).pipe(
          map((updatedUser: any) =>
            UpdateUser.actionSuccess({ dto: updatedUser })
          ),
          catchError((error) => {
            return of(UpdateUser.actionFailure({ error }));
          })
        )
      )
    )
  );

  deleteUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteUser.action),
      mergeMap((action: any) =>
        this.usersService.DeleteById(action.id).pipe(
          map((deletedUser: any) =>
            DeleteUser.actionSuccess({ dto: deletedUser })
          ),
          catchError((error) => {
            return of(DeleteUser.actionFailure({ error }));
          })
        )
      )
    )
  );
}
