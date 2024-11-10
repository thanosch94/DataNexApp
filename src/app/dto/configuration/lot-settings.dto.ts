import { Guid } from "guid-typescript";
import { LotStrategyEnum } from "../../enums/lot-strategy.enum";
import { LotStrategyApplyFieldEnum } from "../../enums/lot-strategy-apply-field.enum";

export class LotSettingsDto {
  Id:Guid;
  LotStrategy: LotStrategyEnum;
  CompanyId:Guid;
  LotStrategyApplyField: LotStrategyApplyFieldEnum;
}
