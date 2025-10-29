import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeneralState } from '../../shared/reducers.factory';

const selectGeneralState = createFeatureSelector<GeneralState>('shippingMethods')

export const selectAllShippingMethods= createSelector(
  selectGeneralState,
  state => state.data
);
