import { createReducer, on } from "@ngrx/store";
import { DocumentAdditionalChargeDto } from "../../dto/document-additional-charge.dto";
import { DeleteDocumentAdditionalCharge, GetAllDocumentAdditionalCharges, GetDocumentAdditionalChargesByDocumentId, InsertDocumentAdditionalCharge, UpdateDocumentAdditionalCharge } from "./document-additional-charges.actions";

export interface DocumentAdditionalChargesState {
  data: DocumentAdditionalChargeDto[];
  error: string | null;
}

export const initialDocumentAdditionalChargesState: DocumentAdditionalChargesState = {
  data: [],
  error: null,
};

export const documentAdditionalChargesReducer = createReducer(
  initialDocumentAdditionalChargesState,
  //GetAll
  on(GetAllDocumentAdditionalCharges.action, (state) => ({ ...state })),
  on(GetAllDocumentAdditionalCharges.actionSuccess, (state, { data }) => ({
    ...state,
    data,
  })),
  on(GetAllDocumentAdditionalCharges.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //Get By Document Id
  on(GetDocumentAdditionalChargesByDocumentId.action, (state) => ({ ...state })),
  on(GetDocumentAdditionalChargesByDocumentId.actionSuccess, (state, { data }) => {
    const updatedItems = state.data.map(item => {
    const found = data.find(d => d.Id === item.Id);
    return found ? found : item;
  });

  const newItems = data.filter(d => !state.data.some(i => i.Id === d.Id));
    return {
      ...state,
      data:[...updatedItems,...newItems],
    };
  }),
  on(GetDocumentAdditionalChargesByDocumentId.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //UpdateDto
  on(UpdateDocumentAdditionalCharge.actionSuccess, (state, { dto }) => ({
    ...state,
    data: state.data.map((p: DocumentAdditionalChargeDto) => (p.Id == dto.Id ? dto : p)),
  })),
  on(UpdateDocumentAdditionalCharge.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //InsertDto
  on(InsertDocumentAdditionalCharge.actionSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data, dto],
  })),
  on(InsertDocumentAdditionalCharge.actionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //DeleteById
  on(DeleteDocumentAdditionalCharge.actionSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data.filter((x) => x.Id != dto.Id)],
    error: null,
  })),
  on(DeleteDocumentAdditionalCharge.actionFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
