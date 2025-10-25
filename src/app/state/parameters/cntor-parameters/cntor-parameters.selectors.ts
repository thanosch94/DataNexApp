import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeneralState } from '../../shared/reducers.factory';

const selectGeneralState = createFeatureSelector<GeneralState>('cntorParameters')

export const selectAllCntorParameters= createSelector(
  selectGeneralState,
  state => state.data
);
