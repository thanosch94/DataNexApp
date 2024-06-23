import { DnColumnLookupDto } from "./dn-column-lookup.dto";

export class DnColumnDto {
  DataField: string;
  DataType: string;
  Caption:string;
  Lookup?: DnColumnLookupDto;
  Visible?:boolean =true;
}
