import { Guid } from "guid-typescript";
import { LotStrategyEnum } from "../../enums/lot-strategy.enum";

export class LotSettingsDto {
  Id:Guid;
  LotStrategy: LotStrategyEnum;
  CompanyId:Guid;
}
