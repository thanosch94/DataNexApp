import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BrandsState } from "./brands.reducer";

export const selectBrandState = createFeatureSelector<BrandsState>('brands')

export const selectAllBrands = createSelector(
  selectBrandState,
  state=>state.data
)
