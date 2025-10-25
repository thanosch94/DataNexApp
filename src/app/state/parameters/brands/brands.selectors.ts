import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GeneralState } from "../../shared/reducers.factory";

const selectGeneralState = createFeatureSelector<GeneralState>('brands')

export const selectAllBrands = createSelector(
  selectGeneralState,
  state=>state.data
)

