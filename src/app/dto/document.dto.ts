import { Guid } from "guid-typescript";

export class DocumentDto {
  Id:Guid;
  DocumentDateTime:Date;
  DocumentTypeId:Guid;
  DocumentNumber:string;
  DocumentStatusId:Guid;
  CustomerId:Guid;
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
