import { createFeatureSelector, createSelector } from "@ngrx/store"
import { StatusesState } from "./statuses.reducer"

export const selectStatusState = createFeatureSelector<StatusesState>('statuses')

export const selectAllStatuses = createSelector(
  selectStatusState,
  state=>state.data
)
