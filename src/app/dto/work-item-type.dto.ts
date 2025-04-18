import { Guid } from "guid-typescript";
import { WorkItemCategoryEnum } from "../enums/work-item-category.enum";

export class WorkItemTypeDto {
  Id:Guid;
  Name:string;
  Icon?:string;
  IconColor?:string;
  IsDefault:boolean;
  Category:WorkItemCategoryEnum
}
