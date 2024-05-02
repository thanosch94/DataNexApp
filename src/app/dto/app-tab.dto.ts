import { Guid } from "guid-typescript";

export class AppTabDto {
  Id:Guid;
  Name:string;
  Component:any;
  Key:string;
  Active:boolean;
  Route:any;
  Hint:string;
}
