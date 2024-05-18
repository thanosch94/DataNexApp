import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { StatusDto } from "../dto/status.dto";
import { UserDto } from "../dto/user.dto";
import { AuthService } from "../services/auth.service";

export class UsersViewModel {
  service: string;
  headers: any;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
    this.headers = this.auth.getHeaders();

  }

  public GetAll() {
    return this.http.get(this.service + 'Users/getall', {
      headers: this.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'Users/getbyid/' + id, {
      headers: this.headers,
    });
  }

  public InsertDto(user:UserDto) {
    return this.http.post(this.service + 'Users/insertdto', user, {
      headers: this.headers,
    });
  }

  public UpdateDto(user:UserDto) {
    return this.http.put(this.service + 'Users/updatedto', user, {
      headers: this.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'Users/deletebyid/' + id, {
      headers: this.headers,
    });
  }
}
