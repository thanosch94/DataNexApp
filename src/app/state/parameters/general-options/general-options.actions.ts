import { GeneralOptionsDto } from "../../../dto/configuration/general-options.dto";
import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction } from "../../shared/actions.factory";

export const GetAllGeneralOptions = addGetAction<GeneralOptionsDto>("[General Options] Get All ");

export const InsertGeneralOptions = addInsertAction<GeneralOptionsDto>("[General Options] Insert Dto")

export const UpdateGeneralOptions = addUpdateAction<GeneralOptionsDto>("[General Options] Update Dto")

export const DeleteGeneralOptions = addDeleteAction<GeneralOptionsDto>("[General Options] Delete By Id")



