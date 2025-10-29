import { createReducer } from '@ngrx/store';
import {
  createDeleteReducer,
  createGetAllReducer,
  createInsertReducer,
  createUpdateReducer,
  GeneralState,
} from '../../shared/reducers.factory';
import { DeleteShippingMethod, GetAllShippingMethods, InsertShippingMethod, UpdateShippingMethod } from './shipping-methods.actions';

export const initialGeneralState: GeneralState = {
  data: [],
  lookup: [],
  error: null,
};

export const shippingMethodsReducer = createReducer(
  initialGeneralState,
  ...createGetAllReducer(GetAllShippingMethods),
  ...createInsertReducer(InsertShippingMethod),
  ...createUpdateReducer(UpdateShippingMethod),
  ...createDeleteReducer(DeleteShippingMethod)
);
