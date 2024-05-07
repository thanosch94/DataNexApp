import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from "guid-typescript";
import { StatusDto } from "../dto/status.dto";
import { UserDto } from "../dto/user.dto";
import { AuthService } from "../services/auth.service";

export class UsersViewModel {
  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();
  }

  public GetAll() {
    let headers = {
      'Content-Type': 'application/json',
    };

    return this.http.get(this.service + 'Users/getall', {
      headers: headers,
    });
  }

  public GetById(id: Guid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.service + 'Users/getbyid/' + id, {
      headers: headers,
    });
  }

  public InsertDto(user:UserDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.service + 'Users/insertdto', user, {
      headers: headers,
    });
  }

  public UpdateDto(user:UserDto) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(this.service + 'Users/updatedto', user, {
      headers: headers,
    });
  }

  public DeleteById(id: Guid) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete(this.service + 'Users/deletebyid/' + id, {
      headers: headers,
    });
  }
}
