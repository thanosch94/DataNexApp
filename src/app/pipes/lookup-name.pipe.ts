import { Pipe, PipeTransform } from '@angular/core';
import { DnColumnDto } from '../dto/dn-column.dto';
import { map, of } from 'rxjs';

@Pipe({
  name: 'lookupName',
  standalone: true,
})
export class LookupNamePipe implements PipeTransform {
  transform(data: any, row: any, column: DnColumnDto) {
    if (column.Lookup?.DataSource) {
      let dataToReturn = column.Lookup?.DataSource.find(
        (x: any) => x[column.Lookup!.ValueExpr] == data
      );
      if (dataToReturn && column.Lookup.DisplayExpr) {
        return of(dataToReturn[column.Lookup!.DisplayExpr]);
      } else if (dataToReturn && column.Lookup.DisplayMultExpr) {
        return of(dataToReturn[column.Lookup.DisplayMultExpr(dataToReturn)]);
      }
    } else if (column.Lookup?.DataSource$) {
      return column.Lookup.DataSource$.pipe(
        map((arr: any[]) => {
          const found = arr.find(
            (x: any) => x[column.Lookup!.ValueExpr] == data
          );
          if (!found) return data;

          if (column.Lookup?.DisplayExpr)
            return found[column.Lookup.DisplayExpr];
          if (column.Lookup?.DisplayMultExpr)
            return column.Lookup.DisplayMultExpr(found);
          return data;
        })
      );
    }

    // Default fallback
    return of(data);

    //   if(column.Lookup && row[column.Lookup.ValueExpr]){
    //     if(row[column.Lookup.DisplayExpr]){
    //       return row[column.Lookup.DisplayExpr]
    //     }
    //   }
    //   if (data != null && column.Lookup && !column.Dependent) {
    //     let lookupObject = column.Lookup.DataSource.find(
    //       (x: any) => x[column.Lookup!.ValueExpr] == data
    //     );
    //     if (lookupObject != null && column.Lookup) {
    //       return lookupObject[column.Lookup.DisplayExpr];
    //     }
    //   }else if (data != null && column.Dependent) {
    //     let lookupObject = row.DataSource[column.DataField].find(
    //       (x: any) => x[column.Lookup!.ValueExpr] == data
    //     );
    //     if (lookupObject != null && column.Lookup) {
    //       return lookupObject[column.Lookup.DisplayExpr];
    //     }
    //   }
    //   return
  }
}
