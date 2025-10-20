import { createFeatureSelector, createSelector } from "@ngrx/store"
import { DocumentTypesState } from "./document-types.reducer"

export const selectDocumentTypesState = createFeatureSelector<DocumentTypesState>('documentTypes')

export const selectAllDocumentTypes = createSelector(
  selectDocumentTypesState,
  (state)=>state.data
)

export const selectActiveDocumentTypesLookupByDocumentTypeGroup = (docTypeGroup:any) => createSelector(
  selectDocumentTypesState,
  (state: DocumentTypesState) => state.data.filter(x => x.IsActive==true && x.DocumentTypeGroup == docTypeGroup)
);

export const selectDocumentTypesLookup = createSelector(
  selectDocumentTypesState,
  (state)=>state.lookup
)
export const selectSelectedDocumentType = createSelector(
  selectDocumentTypesState,
  (state)=>state.selected
)
