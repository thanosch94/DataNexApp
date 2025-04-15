import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.reducer";
import { Guid } from "guid-typescript";

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  state => state.data
);

export const selectUserById = (id: Guid) => createSelector(
  selectUsersState,
  (state: UsersState) => state.data.find((user:any) => user.Id === id)
);
