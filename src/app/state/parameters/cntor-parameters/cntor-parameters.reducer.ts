import { createReducer } from '@ngrx/store';
import {
  createDeleteReducer,
  createGetAllReducer,
  createInsertReducer,
  createUpdateReducer,
  GeneralState,
} from '../../shared/reducers.factory';
import { DeleteCntorParameters, GetAllCntorParameters, InsertCntorParameters, UpdateCntorParameters } from './cntor-parameters.actions';

export const initialGeneralState: GeneralState = {
  data: [],
  lookup: [],
  error: null,
};

export const CntorParametersReducer = createReducer(
  initialGeneralState,
  ...createGetAllReducer(GetAllCntorParameters),
  ...createInsertReducer(InsertCntorParameters),
  ...createUpdateReducer(UpdateCntorParameters),
  ...createDeleteReducer(DeleteCntorParameters)
);
