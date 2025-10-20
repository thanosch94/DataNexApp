import { DocumentAdditionalChargeDto } from "../../dto/document-additional-charge.dto";
import { addDeleteAction, addGetAction, addGetByEntityIdAction, addGetByStringIdAction, addUpdateAction } from "../shared/actions.factory";

export const GetAllDocumentAdditionalCharges = addGetAction<DocumentAdditionalChargeDto>("[Document Additional Charges] Get All ");

export const GetDocumentAdditionalChargesByDocumentId = addGetByEntityIdAction<DocumentAdditionalChargeDto>('[Document Additional Charges] Get By Document Id')

export const InsertDocumentAdditionalCharge = addUpdateAction<DocumentAdditionalChargeDto>('[Document Additional Charges] Insert Dto')

export const UpdateDocumentAdditionalCharge = addUpdateAction<DocumentAdditionalChargeDto>('[Document Additional Charges] Update Dto')

export const DeleteDocumentAdditionalCharge = addDeleteAction<DocumentAdditionalChargeDto>('[Document Additional Charges] Delete By Id')
