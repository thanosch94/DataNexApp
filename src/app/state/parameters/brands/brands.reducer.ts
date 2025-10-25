import { createReducer } from '@ngrx/store';
import {
  DeleteBrand,
  GetAllBrands,
  InsertBrand,
  UpdateBrand,
} from './brands.actions';
import {
  createDeleteReducer,
  createGetAllReducer,
  createInsertReducer,
  createUpdateReducer,
  GeneralState,
} from '../../shared/reducers.factory';

export const initialGeneralState: GeneralState = {
  data: [],
  lookup: [],
  error: null,
};

export const brandsReducer = createReducer(
  initialGeneralState,
  ...createGetAllReducer(GetAllBrands),
  ...createInsertReducer(InsertBrand),
  ...createUpdateReducer(UpdateBrand),
  ...createDeleteReducer(DeleteBrand)
);
