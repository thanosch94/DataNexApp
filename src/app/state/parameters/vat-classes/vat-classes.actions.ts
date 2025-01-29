import { createAction, props } from "@ngrx/store"
import { VatClassDto } from "../../../dto/vat-class.dto"
import { Guid } from "guid-typescript"

//Get All
export const GetAllVatClasses = createAction('[Vat Classes List] GetAll')

export const GetAllVatClassesSuccess = createAction('[Vat Classes List] GetAll Success', props<{data:VatClassDto[]}>())

export const GetAllVatClassesFailure = createAction('[Vat Classes List] GetAll Failure', props<{error:string}>())

//Get By Id
export const GetVatClassById = createAction('[Vat Classes List] GetById', props<{id:Guid}>())

export const GetVatClassByIdSuccess = createAction('[Vat Classes List] GetById Success', props<{data:VatClassDto}>())

export const GetVatClassByIdFailure = createAction('[Vat Classes List] GetById Failure', props<{error:string}>())


//InsertDto
export const InsertVatClassDto = createAction('[Vat Classes List] InsertDto', props<{dto:VatClassDto}>())

export const InsertVatClassDtoSuccess = createAction('[Vat Classes List] InsertDto Success', props<{dto:VatClassDto}>())

export const InsertVatClassDtoFailure = createAction('[Vat Classes List] InsertDto Failure', props<{error:string}>())


//UpdateDto
export const UpdateVatClassDto = createAction('[Vat Classes List] UpdateDto', props<{dto:VatClassDto}>())

export const UpdateVatClassDtoSuccess = createAction('[Vat Classes List] UpdateDto Success', props<{dto:VatClassDto}>())

export const UpdateVatClassDtoFailure = createAction('[Vat Classes List] UpdateDto Failure', props<{error:string}>())

//DeleteById

export const DeleteVatClassById = createAction('[Vat Classes List] DeleteById', props<{id:Guid}>())

export const DeleteVatClassByIdSuccess = createAction('[Vat Classes List] DeleteById Success', props<{dto:VatClassDto}>())

export const DeleteVatClassByIdFailure = createAction('[Vat Classes List] DeleteById Failure ', props<{error:string}>())

