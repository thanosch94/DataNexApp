import { Pipe, PipeTransform } from '@angular/core';
import { DnColumnDto } from '../dto/dn-column.dto';

@Pipe({
  name: 'columnDisplayTotal',
  standalone: true

})
export class ColumnDisplayTotalPipe implements PipeTransform {

  transform(value: any, columns?: DnColumnDto[]): any {
    debugger
    if(columns){
      let showTotalRow = columns.some(x=>x.DisplayColumnTotal==true)

      if(showTotalRow){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }

}
