import { createFeatureSelector, createSelector } from "@ngrx/store"
import { DocumentTypesState } from "./document-types.reducer"

export const selectDocumentTypesState = createFeatureSelector<DocumentTypesState>('documentTypes')

export const selectAllDocumentTypes = createSelector(
  selectDocumentTypesState,
  (state)=>state.data
)

export const selectDocumentTypesLookup = createSelector(
  selectDocumentTypesState,
  (state)=>state.lookup
)
export const selectSelectedDocumentType = createSelector(
  selectDocumentTypesState,
  (state)=>state.selected
)
