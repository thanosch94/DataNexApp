import { LotStrategyEnum } from "../enums/lot-strategy.enum";

export class LotStrategyEnumList {
  static value = [
    {Id: LotStrategyEnum.FIFO, Name: "FIFO"},
    {Id: LotStrategyEnum.LIFO, Name: "LIFO"},
  ]
}
