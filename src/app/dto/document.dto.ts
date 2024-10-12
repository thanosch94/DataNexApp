import { Guid } from "guid-typescript";

export class DocumentDto {
  Id:Guid;
  SerialNumber?:number;
  Code?:string;
  DocumentDateTime:Date|string|null;
  DocumentTypeId:Guid;
  DocumentTypeName:string;
  DocumentNumber:string;
  DocumentStatusId:Guid;
  CustomerId:Guid;
  CustomerName:string;
  CustomerPhone1:string;
  DocumentTotal?:number;
  ShippingAddress?:string
  ShippingRegion?:string
  ShippingPostalCode?:string;
  ShippingCity ?:string
  ShippingCountry?:string
  ShippingPhone1?:string;
  ShippingPhone2?:string;
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
DocumentStatusName: any;
  DocumentCode: string;
SupplierId?: Guid;
}
