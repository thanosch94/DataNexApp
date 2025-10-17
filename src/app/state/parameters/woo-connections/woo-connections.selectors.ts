import { Guid } from "guid-typescript"
import { WooConnectionsState } from "./woo-connections.reducer"
import { createFeatureSelector, createSelector } from "@ngrx/store"

export const selectWooConnectionsState = createFeatureSelector<WooConnectionsState>('wooConnections')

export const selectAllWooConnections = createSelector(
  selectWooConnectionsState,
  state=>state.data
)

export const selectWooConnectionById = (id:Guid)=>
  createSelector(
    selectWooConnectionsState,
    state=>(state.data).find((x:any)=>x.Id==id)
  )


