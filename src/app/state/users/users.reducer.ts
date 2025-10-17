import { createReducer, on } from "@ngrx/store";
import { UserDto } from "../../dto/user.dto";
import { DeleteUser, GetAllUsers, GetUserById, InsertUser, UpdateUser } from "./users.actions";

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
  on(GetAllUsers.action, (state) => ({ ...state })),
  on(GetAllUsers.actionSuccess, (state, { data }) => ({
    ...state,
    data:data,
    error: null,
  })),
  on(GetAllUsers.actionFailure, (state, { error }) => ({ ...state, error })),

  //Get By Id
  on(GetUserById.action, (state) => ({ ...state })),
  on(GetUserById.actionSuccess, (state, { dto:data }) => ({
    ...state,
    selected:data,
    error: null,
  })),
  on(GetUserById.actionFailure, (state, { error }) => ({ ...state, error })),

  //InsertDto
  on(InsertUser.action, (state)=>({...state})),
  on(InsertUser.actionSuccess,(state, {dto:data})=>({
    ...state,
    data:[...state.data, data],
    error:null
  })),
  on(InsertUser.actionFailure, (state,{error})=>({
    ...state,
    error
  })),

  //UpdateDto
  on(UpdateUser.actionSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==dto.Id?dto:x)],
    error:null
  })),
  on(UpdateUser.actionFailure, (state, {error})=> ({
    ...state,
    error
  })),

  //DeleteById
  on(DeleteUser.actionSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.filter(x=>x.Id!=dto.Id)],
    error:null
  })),
  on(DeleteUser.actionFailure, (state, {error})=>({
    ...state,
    error
  }))
);
