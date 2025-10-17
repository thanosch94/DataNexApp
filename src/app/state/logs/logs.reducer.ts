import { createReducer, on } from "@ngrx/store";
import { LogDto } from "../../dto/log.dto";
import { GetAllLogs } from "./logs.actions";

export interface LogsState {
  data: LogDto[];
  error: any;
}

export const initialLogsState: LogsState = {
  data: [],
  error: null,
};

export const logsReducer = createReducer(
  initialLogsState,
  on(GetAllLogs.action, (state) => ({ ...state })),
  on(GetAllLogs.actionSuccess, (state, { data }) => ({
    ...state,
    data:data,
    error: null,
  })),
  on(GetAllLogs.actionFailure, (state, { error }) => ({ ...state, error })),
)
