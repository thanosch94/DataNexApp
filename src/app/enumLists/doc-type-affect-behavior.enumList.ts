import { DocTypeAffectBehaviorEnum } from "../enums/doc-type-affect-behavior.enum";

export class DocTypeAffectBehaviorEnumList {
  static value = [
    {Id: DocTypeAffectBehaviorEnum.None, Name: "None"},
    {Id: DocTypeAffectBehaviorEnum.Increase, Name: "Increase"},
    {Id: DocTypeAffectBehaviorEnum.Decrease, Name: "Decrease"},
  ]
}
