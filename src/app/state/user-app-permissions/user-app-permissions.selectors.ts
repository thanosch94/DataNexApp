import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Guid } from "guid-typescript"
import { UserAppPermissionsState } from "./user-app-permissions.reducer"

export const selectUserAppPermissionsState = createFeatureSelector<UserAppPermissionsState>('userAppPermissions')

export const selectUserAllAppPermissions = createSelector(
  selectUserAppPermissionsState,
  (state)=>state.data
)

export const selectUserAppPermissionsByUserId = (id: Guid|string) => createSelector(
  selectUserAppPermissionsState,
  (state)=>state.data.filter(x=>x.UserId==id)
)
