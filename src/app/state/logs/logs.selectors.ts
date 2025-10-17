import { createFeatureSelector, createSelector } from "@ngrx/store"
import { LogsState } from "./logs.reducer"

export const selectLogsState = createFeatureSelector<LogsState>('logs')

export const selectAllLogs = createSelector(
  selectLogsState,
  state=>state.data
)
