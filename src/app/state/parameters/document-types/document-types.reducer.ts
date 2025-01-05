import { createReducer, on } from '@ngrx/store';
import { DocumentTypeDto } from '../../../dto/document-type.dto';
import {
  DeleteDocumentTypeByIdFailure,
  DeleteDocumentTypeByIdSuccess,
  GetAllDocumentTypes,
  GetAllDocumentTypesFailure,
  GetAllDocumentTypesSuccess,
  GetDocumentTypeById,
  GetDocumentTypeByIdFailure,
  GetDocumentTypeByIdSuccess,
  GetDocumentTypesLookup,
  GetDocumentTypesLookupFailure,
  GetDocumentTypesLookupSuccess,
  InsertDocumentTypeDtoFailure,
  InsertDocumentTypeDtoSuccess,
  UpdateDocumentTypeDtoFailure,
  UpdateDocumentTypeDtoSuccess,
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
  on(GetAllDocumentTypes, (state) => ({ ...state })),
  on(GetAllDocumentTypesSuccess, (state, { data }) => ({
    ...state,
    data,
  })),
  on(GetAllDocumentTypesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //GetLookup
  on(GetDocumentTypesLookup, (state) => ({ ...state })),
  on(GetDocumentTypesLookupSuccess, (state, { data }) => ({
    ...state,
    lookup:data,
  })),
  on(GetDocumentTypesLookupFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //GetById
  on(GetDocumentTypeById, (state) => ({ ...state })),
  on(GetDocumentTypeByIdSuccess, (state, { dto }) => ({
    ...state,
    selected:dto,
  })),
  on(GetDocumentTypeByIdFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //InsertDto
  on(InsertDocumentTypeDtoSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data, dto],
    selected:dto,
    error: null,
  })),
  on(InsertDocumentTypeDtoFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //UpdateDto
  on(UpdateDocumentTypeDtoSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data.map((x) => (x.Id == dto.Id ? dto : x))],
    selected: dto,
    error: null,
  })),
  on(UpdateDocumentTypeDtoFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //DeleteById
  on(DeleteDocumentTypeByIdSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data.filter((x) => x.Id != dto.Id)],
    error: null,
  })),
  on(DeleteDocumentTypeByIdFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
