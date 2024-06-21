import { Pipe, PipeTransform } from '@angular/core';
import { DnColumnDto } from '../dto/dn-column.dto';

@Pipe({
  name: 'visbleGridColumns',
  standalone: true
})
export class VisbleGridColumnsPipe implements PipeTransform {

  transform(columns: DnColumnDto[]){
    debugger
    return columns.filter(x=>x.Visible!=false);
  }

}
