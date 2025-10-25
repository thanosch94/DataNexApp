import { LotSettingsDto } from "../../../dto/configuration/lot-settings.dto";
import { addDeleteAction, addGetAction, addUpdateAction } from "../../shared/actions.factory";

export const GetAllLotSettings = addGetAction<LotSettingsDto>("[Lot Settings] Get All ");

export const InsertLotSettings = addUpdateAction<LotSettingsDto>('[Lot Settings] Insert Dto')

export const UpdateLotSettings = addUpdateAction<LotSettingsDto>('[Lot Settings] Update Dto')

export const DeleteLotSettings = addDeleteAction<LotSettingsDto>('[Lot Settings] Delete By Id')
