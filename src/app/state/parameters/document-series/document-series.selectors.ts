import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DocumentSeriesState } from "./document-series.reducer";
import { Guid } from "guid-typescript";

export const selectDocumentSeriesState = createFeatureSelector<DocumentSeriesState>('documentSeries')

export const selectAllDocumentSeries = createSelector(
  selectDocumentSeriesState,
  state=>state.data
)

export const selectDocumentSeriesLookup = createSelector(
  selectDocumentSeriesState,
  state=>state.lookup
)

export const selectDocumentSeriesById = (id: Guid) => createSelector(
  selectDocumentSeriesState,
  (state: DocumentSeriesState) => state.data.find(x => x.Id == id)
);

export const selectDocumentSeriesByDocumetTypeId = (id: Guid) => createSelector(
  selectDocumentSeriesState,
  (state: DocumentSeriesState) => state.data.filter(x => x.DocumentTypeId == id)
);
