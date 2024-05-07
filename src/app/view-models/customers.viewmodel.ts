import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { CustomerDto } from '../dto/customer.dto';
import { AuthService } from '../services/auth.service';

export class CustomersViewModel {
  service: string;
  aadeService: string;
  constructor(private http: HttpClient, private auth:AuthService) {

    this.service = this.auth.getApiService();
  }

  public GetAll() {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'Customers/getall', {
      headers: headers,
    });
  }

  public GetFromAade(username:string, password:string, afmCalledFor:string, afmCalledBy?:string,) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'Customers/getfromaade/'+username+"/"+password+"/"+afmCalledFor +"/" +afmCalledBy, {
      headers: headers,
    });
  }
  public GetById(id: Guid) {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'Customers/getbyid/' + id, {
      headers: headers,
    });
  }

  public InsertDto(customer: CustomerDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.service + 'Customers/insertdto', customer, {
      headers: headers,
    });
  }

  public UpdateDto(customer: CustomerDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(this.service + 'Customers/updatedto', customer, {
      headers: headers,
    });
  }

  public DeleteById(id: Guid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(this.service + 'Customers/deletebyid/' + id, {
      headers: headers,
    });
  }

}
