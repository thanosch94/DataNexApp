import { LotStrategyEnum } from "../enums/lot-strategy.enum";

export class LotStrategyEnumList {
  static value = [
    {Id: LotStrategyEnum.FIFORec, Name: "FIFO (Recommended)"},
    {Id: LotStrategyEnum.FIFO, Name: "FIFO"},
    {Id: LotStrategyEnum.LIFORec, Name: "LIFO (Recommended)"},
    {Id: LotStrategyEnum.LIFO, Name: "LIFO"},
  ]
}
