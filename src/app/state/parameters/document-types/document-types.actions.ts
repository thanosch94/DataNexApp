import { createAction, props } from "@ngrx/store";
import { DocumentTypeDto } from "../../../dto/document-type.dto";
import { Guid } from "guid-typescript";

//Get All
export const GetAllDocumentTypes = createAction('[Document Types List] GetAll')
export const GetAllDocumentTypesSuccess = createAction('[Document Types List] GetAll Success', props<{data:DocumentTypeDto[]}>())
export const GetAllDocumentTypesFailure = createAction('[Document Types List] GetAll Failure', props<{error:any}>())

//Get Lookup
export const GetDocumentTypesLookup = createAction('[Document Types] GetLookup')
export const GetDocumentTypesLookupSuccess = createAction('[Document Types] GetLookup Success', props<{data:DocumentTypeDto[]}>())
export const GetDocumentTypesLookupFailure = createAction('[Document Types] GetLookup Failure', props<{error:any}>())

//Get By Id
export const GetDocumentTypeById = createAction('[Document Types] GetById', props<{id:Guid}>())
export const GetDocumentTypeByIdSuccess = createAction('[Document Types] GetById Success', props<{dto:DocumentTypeDto}>())
export const GetDocumentTypeByIdFailure = createAction('[Document Types] GetById Failure', props<{error:any}>())

//InsertDto
export const InsertDocumentTypeDto = createAction('[Document Types Edit] InsertDto', props<{dto:DocumentTypeDto}>() )
export const InsertDocumentTypeDtoSuccess = createAction('[Document Types Edit] InsertDto Sucess', props<{dto:DocumentTypeDto}>() )
export const InsertDocumentTypeDtoFailure = createAction('[Document Types Edit] InsertDto Failure', props<{error:any}>() )

//UpdateDto
export const UpdateDocumentTypeDto = createAction('[Document Types Edit] UpdateDto', props<{dto:DocumentTypeDto}>() )
export const UpdateDocumentTypeDtoSuccess = createAction('[Document Types Edit] UpdateDto Sucess', props<{dto:DocumentTypeDto}>() )
export const UpdateDocumentTypeDtoFailure = createAction('[Document Types Edit] UpdateDto Failure', props<{error:any}>() )

//DeleteById
export const DeleteDocumentTypeById = createAction('[Document Types Edit] DeleteById', props<{id:Guid}>() )
export const DeleteDocumentTypeByIdSuccess = createAction('[Document Types List-Edit] DeleteById Sucess', props<{dto:DocumentTypeDto}>() )
export const DeleteDocumentTypeByIdFailure = createAction('[Document Types List-Edit] DeleteById Failure', props<{error:any}>() )



