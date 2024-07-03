import { Guid } from "guid-typescript";
import { DocumentTypeGroupEnum } from "../enums/document-type-group.enum";

export class DocumentTypeDto {
  Id:Guid;
  Name:string;
  Abbreviation: string;
  DocumentTypeGroup: DocumentTypeGroupEnum;
  Description?:string;
}
