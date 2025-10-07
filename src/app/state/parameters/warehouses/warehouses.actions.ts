import { WarehouseDto } from "../../../dto/inventory/warehouse.dto";
import { addDeleteAction, addGetAction, addInsertAction, addUpdateAction } from "../../shared/actions.factory";

export const GetAllWarehouses = addGetAction<WarehouseDto>("[Warehouses] Get All ");

export const InsertWarehouse = addInsertAction<WarehouseDto>("[Warehouses] Insert Dto")

export const UpdateWarehouse = addUpdateAction<WarehouseDto>("[Warehouses] Update Dto")

export const DeleteWarehouse = addDeleteAction<WarehouseDto>("[Warehouses] Delete By Id")
