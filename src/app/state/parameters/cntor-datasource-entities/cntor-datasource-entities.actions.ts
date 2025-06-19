import { CntorDatasourceEntityDto } from "../../../dto/configuration/cntor-datasource-entity.dto";
import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction, addGetByDatasourceIdAction } from "../../shared/actions.factory";

export const GetAllCntorDatasourceEntities = addGetAction<CntorDatasourceEntityDto>("[Connector Datasource Entities] Get All ");

export const GetCntorDatasourceEntitiesByDataSourceId= addGetByDatasourceIdAction<CntorDatasourceEntityDto>("[Connector Datasource Entities] Get By Datasource Id ");

export const InsertCntorDatasourceEntity = addInsertAction<CntorDatasourceEntityDto>("[Connector Datasources Entities] Insert Dto")

export const UpdateCntorDatasourceEntity = addUpdateAction<CntorDatasourceEntityDto>("[Connector Datasources Entities] Update Dto")

export const DeleteCntorDatasourceEntity = addDeleteAction<CntorDatasourceEntityDto>("[Connector Datasources Entities] Delete By Id")



