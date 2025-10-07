import { createFeatureSelector, createSelector } from "@ngrx/store"
import { WarehousesState } from "./warehouses.reducer"
import { Guid } from "guid-typescript"

export const selectWarehousesState = createFeatureSelector<WarehousesState>('warehouses')

export const selectAllWarehouses = createSelector(
  selectWarehousesState,
  state=>state.data
)

export const selectWarehouseById = (id:Guid)=>
  createSelector(
    selectWarehousesState,
    state=>(state.data).find((x:any)=>x.Id==id)
  )

export const selectDefaultWarehouse =
  createSelector(
    selectWarehousesState,
    (state)=>state.data.find((x:any)=>x.IsDefault==true)
  )
