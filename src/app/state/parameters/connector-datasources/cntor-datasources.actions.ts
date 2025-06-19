import { CntorDatasourceDto } from "../../../dto/configuration/cntor-datasource.dto";
import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction } from "../../shared/actions.factory";

export const GetAllCntorDatasources = addGetAction<CntorDatasourceDto>("[Connector Datasources] Get All ");

export const InsertCntorDatasource = addInsertAction<CntorDatasourceDto>("[Connector Datasources] Insert Dto")

export const UpdateCntorDatasource = addUpdateAction<CntorDatasourceDto>("[Connector Datasources] Update Dto")

export const DeleteCntorDatasource = addDeleteAction<CntorDatasourceDto>("[Connector Datasources] Delete By Id")



