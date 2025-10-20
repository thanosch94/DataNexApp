import { createReducer, on } from '@ngrx/store';
import { DocumentTypeDto } from '../../../dto/document-type.dto';
import {
  DeleteDocumentType,
  GetAllDocumentTypes,
  GetDocumentTypeById,
  GetDocumentTypesLookup,
  InsertDocumentType,
  UpdateDocumentType,
} from './document-types.actions';

export interface DocumentTypesState {
  data: DocumentTypeDto[];
  lookup: DocumentTypeDto[];
  selected:DocumentTypeDto|null;
  error: any;
}

export const initialDocumentTypesState: DocumentTypesState = {
  data: [],
  lookup: [],
  selected:null,
  error: null,
};

export const documentTypesReducer = createReducer(
  initialDocumentTypesState,
  //GetAll
  on(GetAllDocumentTypes.action, (state) => ({ ...state })),
  on(GetAllDocumentTypes.actionSuccess, (state, { data }) => ({
    ...state,
    data,
  })),
  on(GetAllDocumentTypes.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //GetLookup
  on(GetDocumentTypesLookup.action, (state) => ({ ...state })),
  on(GetDocumentTypesLookup.actionSuccess, (state, { data }) => ({
    ...state,
    lookup:data,
  })),
  on(GetDocumentTypesLookup.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //GetById
  on(GetDocumentTypeById.action, (state) => ({ ...state })),
  on(GetDocumentTypeById.actionSuccess, (state, { dto }) => ({
    ...state,
    selected:dto,
  })),
  on(GetDocumentTypeById.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //InsertDto
  on(InsertDocumentType.actionSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data, dto],
    selected:dto,
    error: null,
  })),
  on(InsertDocumentType.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //UpdateDto
  on(UpdateDocumentType.actionSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data.map((x) => (x.Id == dto.Id ? dto : x))],
    selected: dto,
    error: null,
  })),
  on(UpdateDocumentType.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //DeleteById
  on(DeleteDocumentType.actionSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data.filter((x) => x.Id != dto.Id)],
    error: null,
  })),
  on(DeleteDocumentType.actionFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
