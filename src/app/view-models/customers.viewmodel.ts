import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Guid } from 'guid-typescript';
import { CustomerDto } from '../dto/customer.dto';
import { AuthService } from '../services/auth.service';

export class CustomersViewModel {
  service: string;
  aadeService: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {

    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();
  }

  public GetAll() {
    return this.http.get(this.service + 'Customers/getall', {headers:this.headers});
  }

  public GetFromAade(username:string, password:string, afmCalledFor:string, afmCalledBy?:string,) {

    return this.http.get(this.service + 'Customers/getfromaade/'+username+"/"+password+"/"+afmCalledFor +"/" +afmCalledBy, {
      headers: this.headers,
    });
  }
  public GetById(id: Guid) {
    return this.http.get(this.service + 'Customers/getbyid/' + id, {
      headers: this.headers,
    });
  }

  public InsertDto(customer: CustomerDto) {
    return this.http.post(this.service + 'Customers/insertdto', customer, {
      headers: this.headers,
    });
  }

  public UpdateDto(customer: CustomerDto) {
    return this.http.put(this.service + 'Customers/updatedto', customer, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'Customers/deletebyid/' + id, {
      headers: this.headers,
    });
  }

}
