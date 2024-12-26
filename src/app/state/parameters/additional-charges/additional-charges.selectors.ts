import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdditionalChargesState } from "./additional-charges.reducer";

export const selectAdditionalChargesState = createFeatureSelector<AdditionalChargesState>('additionalCharges')

export const selectAllAdditionalCharges = createSelector(
  selectAdditionalChargesState,
  (state)=>state.data
)
