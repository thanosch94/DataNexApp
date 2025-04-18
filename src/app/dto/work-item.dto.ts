import { Guid } from "guid-typescript";
import { WorkItemCategoryEnum } from "../enums/work-item-category.enum";

export class WorkItemDto {
  Id:Guid
  Name:string;
  Description: string;
  MasterTaskId: string;
  StatusId: Guid;
  AssigneeId: Guid; //UserId
  WorkItemTypeId:Guid;
  WorkItemCategory:WorkItemCategoryEnum;
  SprintId:Guid;
}
