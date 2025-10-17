import { createAction, props } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { UserDto } from '../../dto/user.dto';
import { addDeleteAction, addGetAction, addGetByIdAction, addUpdateAction } from '../shared/actions.factory';

type T = UserDto;
export const GetAllUsers = addGetAction<T>("[Users Edit] Get All ");

export const GetUserById = addGetByIdAction<T>('[Users Edit] GetById')

export const InsertUser = addUpdateAction<T>('[Users Edit] InsertDto')

export const UpdateUser = addUpdateAction<T>('[Users Edit] UpdateDto')

export const DeleteUser = addDeleteAction<T>('[Users Edit] DeleteById')

