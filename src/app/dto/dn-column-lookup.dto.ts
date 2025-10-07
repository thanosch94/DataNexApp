import { Observable } from 'rxjs';
export class DnColumnLookupDto {
  DataSource?:any;
  DataSource$?:Observable<any>;
  ValueExpr:string;
  DisplayExpr?: string;
  DisplayMultExpr?: any;
}
