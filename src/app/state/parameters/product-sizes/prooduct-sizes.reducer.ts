import { createReducer } from '@ngrx/store';
import {
  createDeleteReducer,
  createGetAllReducer,
  createInsertReducer,
  createUpdateReducer,
  GeneralState,
} from '../../shared/reducers.factory';
import {
  DeleteProductSize,
  GetAllProductSizes,
  InsertProductSize,
  UpdateProductSize,
} from './product-sizes.actions';

export const initialGeneralState: GeneralState = {
  data: [],
  lookup: [],
  error: null,
};

export const productSizesReducer = createReducer(
  initialGeneralState,
  ...createGetAllReducer(GetAllProductSizes),
  ...createInsertReducer(InsertProductSize),
  ...createUpdateReducer(UpdateProductSize),
  ...createDeleteReducer(DeleteProductSize)
);
