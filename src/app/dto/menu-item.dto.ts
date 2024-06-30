import { Guid } from "guid-typescript";

export class MenuItemDto {
  Id:Guid;
  Name:string;
  Path?:string;
  IsOpen?:boolean = false
  Icon?:string;
  Params?:Object;
  Children?: MenuItemDto[]
}
