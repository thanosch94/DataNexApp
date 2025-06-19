import { CntorDatasourcesState } from './cntor-datasources.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectCntorDatasourceState = createFeatureSelector<CntorDatasourcesState>('connectorDatasources')

export const selectAllCntorDatasources = createSelector(
  selectCntorDatasourceState,
  state=>state.data
)
