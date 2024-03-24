import { Guid } from "guid-typescript";

export class DocumentDto {
  Id:Guid;
  DocumentDateTime:Date|string|null;
  DocumentTypeId:Guid;
  DocumentTypeName:string;
  DocumentNumber:string;
  DocumentStatusId:Guid;
  CustomerId:Guid;
  CustomerName:string;
  CustomerPhone1:number;
  Documentotal?:number;
  ShippingAddress?:string
  ShippingRegion?:string
  ShippingPostalCode?:number;
  ShippingCity ?:string
  ShippingCountry?:string
  ShippingPhone1?:number;
  ShippingPhone2?:number;
  ShippingEmail?:string;
  UserText1?:string;
  UserText2?:string;
  UserText3?:string;
  UserText4?:string;
  UserNumber1?:number;
  UserNumber2?:number;
  UserNumber3?:number;
  UserNumber4?:number;
  UserDate1?:Date;
  UserDate2?:Date;
  UserDate3?:Date;
  UserDate4?:Date;
}
