import { createReducer, on } from "@ngrx/store";
import { DeleteWooConnection, GetAllWooConnections, InsertWooConnection, UpdateWooConnection } from "./woo-connections.actions";
import { WooConnectionsDataDto } from "../../../dto/woo-connections-data.dto";

export interface WooConnectionsState {
  data: WooConnectionsDataDto[];
  error: any;
}

export const initialWooConnectionsState: WooConnectionsState = {
  data: [],
  error: null,
};

export const wooConnectionsReducer = createReducer(
  initialWooConnectionsState,
  on(GetAllWooConnections.action, (state) => ({ ...state })),
  on(GetAllWooConnections.actionSuccess, (state, { data }) => ({
    ...state,
    data:data,
    error: null,
  })),
  on(GetAllWooConnections.actionFailure, (state, { error }) => ({ ...state, error })),

  //InsertDto
  on(InsertWooConnection.actionSuccess,(state, {dto:data})=>({
    ...state,
    data:[...state.data, data],
    error:null
  })),
  on(InsertWooConnection.actionFailure, (state,{error})=>({
    ...state,
    error
  })),

  //UpdateDto
  on(UpdateWooConnection.actionSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==dto.Id?dto:x)],
    error:null
  })),
  on(UpdateWooConnection.actionFailure, (state, {error})=> ({
    ...state,
    error
  })),

  //DeleteById
  on(DeleteWooConnection.actionSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.filter(x=>x.Id!=dto.Id)],
    error:null
  })),
  on(DeleteWooConnection.actionFailure, (state, {error})=>({
    ...state,
    error
  }))
);
