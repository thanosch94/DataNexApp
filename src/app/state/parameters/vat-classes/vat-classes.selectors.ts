import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VatClassesState } from "./vat-classes.reducer";

export const selectVatClassesState = createFeatureSelector<VatClassesState>('vatClasses')

export const selectAllVatClasses = createSelector(
  selectVatClassesState,
  state=>state.data
)
