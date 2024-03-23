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
  ShippingEmail?:string

}
