import { DnColumnLookupDto } from './dn-column-lookup.dto';

export class DnColumnDto {
  DataField: string;
  DataType: string;
  Caption: string;
  Lookup?: DnColumnLookupDto;
  Visible?: boolean = true;
  OnValueChange?: any;
  OnSelectionChange?: any;
  OnClick?: any;
  ReadOnly?: boolean = false;

  //Number Inputs
  Min?:number
  Max?:number
  DefaultValue?: any;
}
