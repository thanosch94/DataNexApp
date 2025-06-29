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
  Format?:string //Date Format eg dd/MM/yyyy
  WrapText?:boolean // Using this plain value is displayed and not dn-textbox -- Only for readonly columns
  //Number Inputs
  Min?:number
  Max?:number
  DefaultValue?: any;
  DisplayColumnTotal?:boolean = false
  Icon?: string; //Used to display an icon in the input field
  IconPosition?: string;//start-end
  OnIconClicked?:any;
  OnFocusOut?:any;
  Width?: number;
  IconTooltip?: string;

}
