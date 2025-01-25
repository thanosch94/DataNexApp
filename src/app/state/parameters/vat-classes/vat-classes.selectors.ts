import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VatClassesState } from "./vat-classes.reducer";
import { Guid } from "guid-typescript";

export const selectVatClassesState = createFeatureSelector<VatClassesState>('vatClasses')

export const selectAllVatClasses = createSelector(
  selectVatClassesState,
  state=>state.data
)

export const selectVatClassById = (id:Guid)=>
  createSelector(
    selectVatClassesState,
    state=>(state.data).find((x:any)=>x.Id==id)
  )

