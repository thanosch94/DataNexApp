import { Injector } from "@angular/core";
import { Guid } from "guid-typescript";

export class AppTabDto {
  Id:Guid;
  Name:string;
  PrevName:string;
  Component:any;
  Key:string;
  Active:boolean;
  Route:any;
  Hint:string;
  Data:Array<Object> =[];
  OriginId: any;
  Injector:Injector
  Params: any;
}
