import { createReducer, on } from '@ngrx/store';
import { CntorDatasourceEntityDto } from '../../../dto/configuration/cntor-datasource-entity.dto';
import {
  DeleteCntorDatasourceEntity,
  GetAllCntorDatasourceEntities,
  GetCntorDatasourceEntitiesByDataSourceId,
  InsertCntorDatasourceEntity,
  UpdateCntorDatasourceEntity,
} from './cntor-datasource-entities.actions';

export interface CntorDatasourceEntitiesState {
  data: CntorDatasourceEntityDto[];
  error: any;
}

export const initialCntorDatasourceEntitiesState: CntorDatasourceEntitiesState =
  {
    data: [],
    error: null,
  };

export const cntorDatasourceEntitiesReducer = createReducer(
  initialCntorDatasourceEntitiesState,

  //GeAll
  on(GetAllCntorDatasourceEntities.action, (state) => ({ ...state })),
  on(GetAllCntorDatasourceEntities.actionSuccess, (state, { data }) => ({
    ...state,
    data:data??[],
    error: null,
  })),
  on(GetAllCntorDatasourceEntities.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //GetByDatasourceId
  on(GetCntorDatasourceEntitiesByDataSourceId.action, (state) => ({
    ...state,
  })),
  on(
    GetCntorDatasourceEntitiesByDataSourceId.actionSuccess,
    (state, { data }) => ({
      ...state,
      data:data??[],
      error: null,
    })
  ),
  on(
    GetCntorDatasourceEntitiesByDataSourceId.actionFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),

  //InsertDto
  on(
    InsertCntorDatasourceEntity.actionSuccess,
    (state, { dto: cntorDatasourceEntity }) => ({
      ...state,
      data: [...state.data, cntorDatasourceEntity],
      error: null,
    })
  ),
  on(InsertCntorDatasourceEntity.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //UpdateDto
  on(
    UpdateCntorDatasourceEntity.actionSuccess,
    (state, { dto: cntorDatasourceEntity }) => ({
      ...state,
      data: [
        ...state.data.map((x) =>
          x.Id == cntorDatasourceEntity.Id ? cntorDatasourceEntity : x
        ),
      ],
      error: null,
    })
  ),
  on(UpdateCntorDatasourceEntity.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //DeleteById
  on(
    DeleteCntorDatasourceEntity.actionSuccess,
    (state, { dto: cntorDatasourceEntity }) => ({
      ...state,
      data: [...state.data.filter((x) => x.Id !== cntorDatasourceEntity.Id)],
      error: null,
    })
  ),
  on(DeleteCntorDatasourceEntity.actionFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
