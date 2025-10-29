import { createReducer } from '@ngrx/store';
import {
  createDeleteReducer,
  createGetAllReducer,
  createInsertReducer,
  createUpdateReducer,
  GeneralState,
} from '../../shared/reducers.factory';
import { DeletePaymentMethod, GetAllPaymentMethods, InsertPaymentMethod, UpdatePaymentMethod } from './payment-methods.actions';

export const initialGeneralState: GeneralState = {
  data: [],
  lookup: [],
  error: null,
};

export const paymentMethodsReducer = createReducer(
  initialGeneralState,
  ...createGetAllReducer(GetAllPaymentMethods),
  ...createInsertReducer(InsertPaymentMethod),
  ...createUpdateReducer(UpdatePaymentMethod),
  ...createDeleteReducer(DeletePaymentMethod)
);
