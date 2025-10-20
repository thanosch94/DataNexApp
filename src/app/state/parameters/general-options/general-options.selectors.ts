import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GeneralOptionsState } from "./general-options.reducer";

export const selectGeneralOptionstate =
  createFeatureSelector<GeneralOptionsState>('generalOptions');

export const selectAllGeneralOptions = createSelector(
  selectGeneralOptionstate,
  (state) => state.data
);
