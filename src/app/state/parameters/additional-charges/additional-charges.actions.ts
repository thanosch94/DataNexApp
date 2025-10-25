import { AdditionalChargeDto } from "../../../dto/additional-charge.dto"

import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction } from "../../shared/actions.factory";


export const GetAllAdditionalCharges = addGetAction<AdditionalChargeDto>("[Additional Charges] Get All ");

export const InsertAdditionalCharge = addInsertAction<AdditionalChargeDto>("[Additional Charges] Insert Dto")

export const UpdateAdditionalCharge = addUpdateAction<AdditionalChargeDto>("[Additional Charges] Update Dto")

export const DeleteAdditionalCharge = addDeleteAction<AdditionalChargeDto>("[Additional Charges] Delete By Id")

