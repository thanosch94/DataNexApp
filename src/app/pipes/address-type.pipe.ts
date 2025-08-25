import { Pipe, PipeTransform } from '@angular/core';
import { CustomerAddressDto } from '../dto/customer-address.dto';
import { AddressTypeEnum } from '../enums/address-type.enum';
import { AddressDto } from '../dto/address.dto';

@Pipe({
  name: 'addressType'
})
export class AddressTypePipe implements PipeTransform {

  transform(addressesList: CustomerAddressDto[], addressType?: AddressTypeEnum): any {
    let data = addressesList?.filter(x=>x.AddressType==addressType)??[]
    if(data.length>0){
      return data;
    }else{
      let newData=[]
      let customerAddress = new CustomerAddressDto();
      customerAddress.IsDefault = true;
      customerAddress.IsInEditMode = true;
      customerAddress.Address = new AddressDto();
      customerAddress.TempId = crypto.randomUUID();
      newData.push(customerAddress);
      return newData
    }
  }

}
