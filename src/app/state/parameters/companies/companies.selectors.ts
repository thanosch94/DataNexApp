import { createFeatureSelector, createSelector } from "@ngrx/store"
import { CompaniesState } from "./companies.reducer"

export const selectCompaniesState = createFeatureSelector<CompaniesState>('companies')

export const selectAllCompanies = createSelector(
  selectCompaniesState,
  state=>state.data
)

export const selectCompaniesLookup = createSelector(
  selectCompaniesState,
  state=>state.lookup
)
