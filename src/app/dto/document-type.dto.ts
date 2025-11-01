import { Guid } from "guid-typescript";
import { DocumentTypeGroupEnum } from "../enums/document-type-group.enum";
import { DocTypeAffectBehaviorEnum } from "../enums/doc-type-affect-behavior.enum";
import { PriceTypesEnum } from "../enums/price-type.enum";
import { DocumentSeriesDto } from "./configuration/document-series.dto";

export class DocumentTypeDto {
  Id:Guid;
  SerialNumber?:number;
  Code?:string;
  Name:string;
  Abbreviation: string;
  DocumentTypeGroup: DocumentTypeGroupEnum;
  Description?:string;
  IsActive:boolean;
  PersonBalanceAffectBehavior:DocTypeAffectBehaviorEnum;
  WareHouseAffectBehavior:DocTypeAffectBehaviorEnum;
  UsesPrices: PriceTypesEnum;
  CancellationDocTypeId: Guid;
  AutoIncrementCodeEnabled: boolean;
  ChecksWareHouseStockOnLineAdded: boolean;
  LotAffectBehavior: DocTypeAffectBehaviorEnum;
  DocumentSeries:DocumentSeriesDto[]
}
