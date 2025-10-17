import { WooConnectionsDataDto } from "../../../dto/woo-connections-data.dto";
import { addDeleteAction, addGetAction, addInsertAction, addUpdateAction } from "../../shared/actions.factory";

export const GetAllWooConnections = addGetAction<WooConnectionsDataDto>("[WooConnections] Get All ");

export const InsertWooConnection = addInsertAction<WooConnectionsDataDto>("[WooConnections] Insert Dto")

export const UpdateWooConnection = addUpdateAction<WooConnectionsDataDto>("[WooConnections] Update Dto")

export const DeleteWooConnection = addDeleteAction<WooConnectionsDataDto>("[WooConnections] Delete By Id")
