import { createReducer, on } from "@ngrx/store";
import { DocumentSeriesDto } from "../../../dto/configuration/document-series.dto";
import { DeleteDocumentSeries, GetAllDocumentSeries, GetDocumentSeriesByDocumentTypeId, GetDocumentSeriesById, GetDocumentSeriesLookup, InsertDocumentSeries, UpdateDocumentSeries } from "./document-series.actions";

export interface DocumentSeriesState {
  data: DocumentSeriesDto[];
  lookup: DocumentSeriesDto[];
  error: any;
}

export const initialDocumentSeriesState: DocumentSeriesState = {
  data: [],
  lookup:[],
  error: null,
};

export const documentSeriesReducer = createReducer(
  initialDocumentSeriesState,

  //GetAll
  on(GetAllDocumentSeries.action, (state) => ({ ...state })),
  on(GetAllDocumentSeries.actionSuccess, (state, { data }) => ({ ...state, data, error:null })),
  on(GetAllDocumentSeries.actionFailure, (state, { error }) => ({ ...state, error })),

  //GetAll
  on(GetDocumentSeriesByDocumentTypeId.action, (state) => ({ ...state })),
  on(GetDocumentSeriesByDocumentTypeId.actionSuccess, (state, { data }) => ({ ...state, data:[...data], error:null })),
  on(GetDocumentSeriesByDocumentTypeId.actionFailure, (state, { error }) => ({ ...state, error })),

  //GetLookup
  on(GetDocumentSeriesLookup.actionSuccess, (state, { data }) => ({ ...state, data, error:null })),
  on(GetDocumentSeriesLookup.actionFailure, (state, { error }) => ({ ...state, error })),

  //GetById
  on(GetDocumentSeriesById.actionSuccess, (state, {dto})=>({
    ...state,
    data:[...(state.data.map(x=>x.Id==dto.Id?dto:x ))],
    error:null
  })),
  on(GetDocumentSeriesById.actionFailure, (state, {error})=>({
    ...state,
    error
  })),

//InsertDto
  on(InsertDocumentSeries.actionSuccess, (state,{dto})=>({
    ...state,
    data:[...state.data, dto],
    error:null
  })),
  on(InsertDocumentSeries.actionFailure, (state, {error})=>({
    ...state,
    error
  })),

  //UpdateDto
  on(UpdateDocumentSeries.actionSuccess, (state,{dto})=>({
    ...state,
    data:[...state.data.map(x=>x.Id==dto.Id?dto:x)],
    error:null
  })),
  on(UpdateDocumentSeries.actionFailure, (state, {error})=>({
    ...state,
    error
  })),

  //DeleteById
  on(DeleteDocumentSeries.actionSuccess, (state, {dto})=>({
    ...state,
    data:[...(state.data.filter(x=>x.Id!==dto.Id))],
    error:null
  })),
  on(DeleteDocumentSeries.actionFailure, (state, {error})=>({
    ...state,
    error
  }))


)
