import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DocumentAdditionalChargesState } from "./document-additional-charges.reducer";
import { Guid } from "guid-typescript";
import { DocumentAdditionalChargeDto } from "../../dto/document-additional-charge.dto";

export const selectDocumentAdditionalChargesState = createFeatureSelector<DocumentAdditionalChargesState>('documentAdditionalCharges');

export const selectAllDocumentAdditionalCharges = createSelector(
  selectDocumentAdditionalChargesState,
  state => state.data
);

export const selectDocumentAdditionalChargesByDocumentId = (id:Guid)=>
  createSelector(
    selectDocumentAdditionalChargesState,
    state=>(state.data).filter((x:DocumentAdditionalChargeDto)=>x.DocumentId==id)
  )
