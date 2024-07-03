import { DocumentTypeGroupEnum } from "../enums/document-type-group.enum";

export class DocumentTypeGroupEnumList {
  static value = [
    {Id: DocumentTypeGroupEnum.Sales, Name: "Sales"},
    {Id: DocumentTypeGroupEnum.Purchasing, Name: "Purchasing"},
    {Id: DocumentTypeGroupEnum.Inventory, Name: "Inventory"},
    {Id: DocumentTypeGroupEnum.Finance, Name: "Finance"}
  ]
}
