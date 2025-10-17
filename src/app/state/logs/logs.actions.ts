import { LogDto } from "../../dto/log.dto";
import { addGetAction } from "../shared/actions.factory";

export const GetAllLogs = addGetAction<LogDto>("[Logs] Get All ");
