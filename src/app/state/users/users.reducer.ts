import { createReducer, on } from "@ngrx/store";
import { UserDto } from "../../dto/user.dto";
import { DeleteUserByIdFailure, DeleteUserByIdSuccess, GetAllUsers, GetAllUsersFailure, GetAllUsersSuccess, GetUserById, GetUserByIdFailure, GetUserByIdSuccess, InsertUserDto, InsertUserDtoFailure, InsertUserDtoSuccess, UpdateUserDtoFailure, UpdateUserDtoSuccess } from "./users.actions";

export interface UsersState {
  data: UserDto[];
  selected: UserDto
  error: any;
}

export const initialUsersState: UsersState = {
  data: [],
  selected: new UserDto(),
  error: null,
};

export const usersReducer = createReducer(
  initialUsersState,
  on(GetAllUsers, (state) => ({ ...state })),
  on(GetAllUsersSuccess, (state, { data }) => ({
    ...state,
    data:data,
    error: null,
  })),
  on(GetAllUsersFailure, (state, { error }) => ({ ...state, error })),

  //Get By Id
  on(GetUserById, (state) => ({ ...state })),
  on(GetUserByIdSuccess, (state, { data }) => ({
    ...state,
    selected:data,
    error: null,
  })),
  on(GetUserByIdFailure, (state, { error }) => ({ ...state, error })),

  //InsertDto
  on(InsertUserDto, (state)=>({...state})),
  on(InsertUserDtoSuccess,(state, {dto:data})=>({
    ...state,
    data:[...state.data, data],
    error:null
  })),
  on(InsertUserDtoFailure, (state,{error})=>({
    ...state,
    error
  })),

  //UpdateDto
  on(UpdateUserDtoSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==dto.Id?dto:x)],
    error:null
  })),
  on(UpdateUserDtoFailure, (state, {error})=> ({
    ...state,
    error
  })),

  //DeleteById
  on(DeleteUserByIdSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.filter(x=>x.Id!=dto.Id)],
    error:null
  })),
  on(DeleteUserByIdFailure, (state, {error})=>({
    ...state,
    error
  }))
);
