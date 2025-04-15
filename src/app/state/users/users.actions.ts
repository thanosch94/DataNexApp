import { createAction, props } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { UserDto } from '../../dto/user.dto';

//Get All Users
export const GetAllUsers = createAction('[Users List] GetAll');

export const GetAllUsersSuccess = createAction(
  '[Users List] GetAll Users Success',
  props<{ data: UserDto[] }>()
);
export const GetAllUsersFailure = createAction(
  '[Users List] GetAll Users Failure',
  props<{ error: string }>()
);

//Get User By Id
export const GetUserById = createAction(
  '[User Edit] GetById',
  props<{ id: Guid }>()
);

export const GetUserByIdSuccess = createAction(
  '[User Edit] Get User By Id Success',
  props<{ data: UserDto }>()
);
export const GetUserByIdFailure = createAction(
  '[User Edit] Get User By Id Failure',
  props<{ error: string }>()
);

//Update User
export const UpdateUserDto = createAction(
  '[User Edit] UpdateDto',
  props<{ dto: UserDto }>()
);

export const UpdateUserDtoSuccess = createAction(
  '[User Edit] Update User Success',
  props<{ dto: UserDto }>()
);
export const UpdateUserDtoFailure = createAction(
  '[User Edit] Update User Failure',
  props<{ error: string }>()
);

//Insert User
export const InsertUserDto = createAction(
  '[User Edit] Insert User',
  props<{ dto: UserDto }>()
);

export const InsertUserDtoSuccess = createAction(
  '[User Edit] Insert User Success',
  props<{ dto: UserDto }>()
);
export const InsertUserDtoFailure = createAction(
  '[User Edit] Insert User Failure',
  props<{ error: string }>()
);

export const DeleteUserById = createAction('[Users List] DeleteById', props<{id:Guid}>())

export const DeleteUserByIdSuccess = createAction('[Users List] DeleteById Success', props<{dto:UserDto}>())

export const DeleteUserByIdFailure = createAction('[Users List] DeleteById Failure ', props<{error:string}>())

