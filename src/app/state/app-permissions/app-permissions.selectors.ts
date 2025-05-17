import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AppPermissionsState } from "./app-permissions.reducer"
import { Guid } from "guid-typescript"

export const selectAppPermissionsState = createFeatureSelector<AppPermissionsState>('appPermissions')

export const selectAllAppPermissions = createSelector(
  selectAppPermissionsState,
  (state)=>state.data
)

export const selectAppPermissionsByEntityId = (id: Guid|string) => createSelector(
  selectAppPermissionsState,
  (state)=>state.data.filter(x=>x.MasterEntityId==id)
)
