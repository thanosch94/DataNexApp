import { createReducer, on } from "@ngrx/store";
import { CntorDatasourceDto } from "../../../dto/configuration/cntor-datasource.dto";
import { DeleteCntorDatasource, GetAllCntorDatasources, InsertCntorDatasource, UpdateCntorDatasource } from "./cntor-datasources.actions";

export interface CntorDatasourcesState {
  data: CntorDatasourceDto[];
  error: any;
}

export const initialCntorDatasourcesState: CntorDatasourcesState = {
  data: [],
  error: null,
};

export const connectorDatasourcesReducer = createReducer(
  initialCntorDatasourcesState,

  //GeAll
  on(GetAllCntorDatasources.action, (state) => ({ ...state })),
  on(GetAllCntorDatasources.actionSuccess, (state, { data }) => ({ ...state, data, error:null })),
  on(GetAllCntorDatasources.actionFailure, (state, { error }) => ({ ...state, error })),

  //InsertDto
  on(InsertCntorDatasource.actionSuccess, (state,{dto:cntorDatasource})=>({
    ...state,
    data:[...state.data, cntorDatasource],
    error:null
  })),
  on(InsertCntorDatasource.actionFailure, (state, {error})=>({
    ...state,
    error
  })),

  //UpdateDto
  on(UpdateCntorDatasource.actionSuccess, (state,{dto:cntorDatasource})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==cntorDatasource.Id?cntorDatasource:x)],
    error:null
  })),
  on(UpdateCntorDatasource.actionFailure, (state, {error})=>({
    ...state,
    error
  })),

  //DeleteById
  on(DeleteCntorDatasource.actionSuccess, (state, {dto:cntorDatasource})=>({
    ...state,
    data:[...(state.data.filter(x=>x.Id!==cntorDatasource.Id))],
    error:null
  })),
  on(DeleteCntorDatasource.actionFailure, (state, {error})=>({
    ...state,
    error
  }))
);
