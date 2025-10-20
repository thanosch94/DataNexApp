import { DocumentTypeDto } from "../../../dto/document-type.dto";
import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction, addGetByIdAction, addGetByEntityIdAction, addGetByStringIdAction } from "../../shared/actions.factory";

export const GetAllDocumentTypes = addGetAction<DocumentTypeDto>("[Document Types] Get All ");

export const GetDocumentTypesLookup = addGetAction<DocumentTypeDto>("[Document Types] Get Lookup ");

export const GetDocumentTypeById = addGetByIdAction<DocumentTypeDto>("[Document Types] Get By Id ");

export const InsertDocumentType = addInsertAction<DocumentTypeDto>("[Document Types] Insert Dto")

export const UpdateDocumentType = addUpdateAction<DocumentTypeDto>("[Document Types] Update Dto")

export const DeleteDocumentType = addDeleteAction<DocumentTypeDto>("[Document Types] Delete By Id")



