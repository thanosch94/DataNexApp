import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GeneralState } from "../../shared/reducers.factory";

const selectGeneralState = createFeatureSelector<GeneralState>('productSizes')

export const selectAllProductSizes= createSelector(
  selectGeneralState,
  state => state.data
);
