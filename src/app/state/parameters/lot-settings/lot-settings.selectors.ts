import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LotSettingsState } from "./lot-settings.reducer";

export const selectLotSettingsState = createFeatureSelector<LotSettingsState>('lotSettings');

export const selectAllLotSettings= createSelector(
  selectLotSettingsState,
  state => state.data
);
