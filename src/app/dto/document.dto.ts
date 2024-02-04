import { Guid } from "guid-typescript";

export class DocumentDto {
  Id:Guid;
  DocumentTypeId:Guid;
  DocumentNumber:string;
  CustomerId:Guid;
  Documentotal?:number;
}
