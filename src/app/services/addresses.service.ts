import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Guid } from 'guid-typescript';
import { AddressDto } from '../dto/address.dto';
import { CustomerAddressDto } from '../dto/customer-address.dto';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

   public GetAll() {
      return this.http.get(this.service + 'Addresses/getall', {
        headers: this.auth.headers,
      });
    }

    public InsertDto(dto: AddressDto) {
      return this.http.post(this.service + 'Addresses/insertdto', dto, {
        headers: this.auth.headers,
      });
    }

    public UpdateDto(dto: AddressDto) {
      return this.http.put(this.service + 'Addresses/updatedto', dto, {
        headers: this.auth.headers,
      });
    }

    public DeleteById(id: Guid) {
      return this.http.delete(this.service + 'Addresses/deletebyid/' + id, {
        headers: this.auth.headers,
      });
    }

    public InsertCustomerAddress(dto: CustomerAddressDto) {
      return this.http.post(this.service + 'Addresses/insert_customer_address/' , dto, {
        headers: this.auth.headers,
      });
    }
    public UpdateCustomerAddress(dto: CustomerAddressDto) {
      return this.http.put(this.service + 'Addresses/update_customer_address/' , dto, {
        headers: this.auth.headers,
      });
    }

    public DeleteCustomerAddressById(id: Guid) {
      return this.http.delete(this.service + 'Addresses/delete_customer_address_by_id/' + id, {
        headers: this.auth.headers,
      });
    }

}
