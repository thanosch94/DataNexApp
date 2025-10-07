import { createReducer, on } from "@ngrx/store";
import { DeleteWarehouse, GetAllWarehouses, InsertWarehouse, UpdateWarehouse } from "./warehouses.actions";
import { WarehouseDto } from "../../../dto/inventory/warehouse.dto";

export interface WarehousesState {
  data: WarehouseDto[];
  error: any;
}

export const initialWarehousesState: WarehousesState = {
  data: [],
  error: null,
};

export const warehousesReducer = createReducer(
  initialWarehousesState,
  on(GetAllWarehouses.action, (state) => ({ ...state })),
  on(GetAllWarehouses.actionSuccess, (state, { data }) => ({
    ...state,
    data:data,
    error: null,
  })),
  on(GetAllWarehouses.actionFailure, (state, { error }) => ({ ...state, error })),

  //InsertDto
  on(InsertWarehouse.actionSuccess,(state, {dto:data})=>({
    ...state,
    data:[...state.data, data],
    error:null
  })),
  on(InsertWarehouse.actionFailure, (state,{error})=>({
    ...state,
    error
  })),

  //UpdateDto
  on(UpdateWarehouse.actionSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==dto.Id?dto:x)],
    error:null
  })),
  on(UpdateWarehouse.actionFailure, (state, {error})=> ({
    ...state,
    error
  })),

  //DeleteById
  on(DeleteWarehouse.actionSuccess, (state, {dto})=>({
    ...state,
    data:[...state.data.filter(x=>x.Id!=dto.Id)],
    error:null
  })),
  on(DeleteWarehouse.actionFailure, (state, {error})=>({
    ...state,
    error
  }))
);
