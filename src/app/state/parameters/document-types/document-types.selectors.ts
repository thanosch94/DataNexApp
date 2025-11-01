import { createFeatureSelector, createSelector } from "@ngrx/store"
import { DocumentTypesState } from "./document-types.reducer"
import { Guid } from "guid-typescript";

export const selectDocumentTypesState = createFeatureSelector<DocumentTypesState>('documentTypes')

export const selectAllDocumentTypes = createSelector(
  selectDocumentTypesState,
  (state)=>state.data
)

export const selectActiveDocumentTypesLookupByDocumentTypeGroup = (docTypeGroup:any) => createSelector(
  selectDocumentTypesState,
  (state: DocumentTypesState) => state.data.filter(x => x.IsActive==true && x.DocumentTypeGroup == docTypeGroup)
);

export const selectDocTypeSeriesByDocTypeId = (id:Guid) => createSelector(
  selectDocumentTypesState,
  (state: DocumentTypesState) => state.data.find(x => x.Id==id)?.DocumentSeries??[]
);

export const selectDocTypeById = (id:Guid) => createSelector(
  selectDocumentTypesState,
  (state: DocumentTypesState) => state.data.find(x => x.Id==id)
);

export const selectDocumentTypesLookup = createSelector(
  selectDocumentTypesState,
  (state)=>state.lookup
)
export const selectSelectedDocumentType = createSelector(
  selectDocumentTypesState,
  (state)=>state.selected
)
