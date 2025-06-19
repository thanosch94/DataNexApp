import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CntorDatasourceEntitiesState } from './cntor-datasource-erntities.reducer';
import { Guid } from 'guid-typescript';

export const selectCntorDatasourceEntitiesState =
  createFeatureSelector<CntorDatasourceEntitiesState>(
    'connectorDatasourceEntities'
  );

export const selectAllCntorDatasourceEntities = createSelector(
  selectCntorDatasourceEntitiesState,
  (state) => state.data??[]
);

export const selectCntorDatasourceEntitiesByDatasourceId = (
  datasourceId: Guid
) => {
  return createSelector(selectCntorDatasourceEntitiesState, (state) =>
    state.data.filter((x) => x.CntorDatasourceId == datasourceId)
  );
};
