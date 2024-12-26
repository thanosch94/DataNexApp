import { createAction, props } from "@ngrx/store"
import { AdditionalChargeDto } from "../../../dto/additional-charge.dto"
import { Guid } from "guid-typescript"

//Get All
export const GetAllAdditionalCharges = createAction('[Additional Charges List] GetAll')

export const GetAllAdditionalChargesSuccess = createAction('[Additional Charges List] GetAll Success', props<{data:AdditionalChargeDto[]}>())

export const GetAllAdditionalChargesFailure = createAction('[Additional Charges List] GetAll Failure', props<{error:string}>())


//InsertDto
export const InsertAdditionalChargeDto = createAction('[Additional Charges List] InsertDto', props<{dto:AdditionalChargeDto}>())

export const InsertAdditionalChargeDtoSuccess = createAction('[Additional Charges List] InsertDto Success', props<{dto:AdditionalChargeDto}>())

export const InsertAdditionalChargeDtoFailure = createAction('[Additional Charges List] InsertDto Failure', props<{error:string}>())


//UpdateDto
export const UpdateAdditionalChargeDto = createAction('[Additional Charges List] UpdateDto', props<{dto:AdditionalChargeDto}>())

export const UpdateAdditionalChargeDtoSuccess = createAction('[Additional Charges List] UpdateDto Success', props<{dto:AdditionalChargeDto}>())

export const UpdateAdditionalChargeDtoFailure = createAction('[Additional Charges List] UpdateDto Failure', props<{error:string}>())

//DeleteById

export const DeleteAdditionalChargeById = createAction('[Additional Charges List] DeleteById', props<{id:Guid}>())

export const DeleteAdditionalChargeByIdSuccess = createAction('[Additional Charges List] DeleteById Success', props<{dto:AdditionalChargeDto}>())

export const DeleteAdditionalChargeByIdFailure = createAction('[Additional Charges List] DeleteById Failure ', props<{error:string}>())

