import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeneralState } from '../../shared/reducers.factory';

const selectGeneralState = createFeatureSelector<GeneralState>('paymentMethods')

export const selectAllPaymentMethods= createSelector(
  selectGeneralState,
  state => state.data
);
