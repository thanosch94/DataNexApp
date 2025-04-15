import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Guid } from 'guid-typescript';
import { UserDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();

  }

  public GetAll() {
    return this.http.get(this.service + 'Users/getall', {
      headers: this.auth.headers,
    });
  }

  public GetById(id: Guid) {
    return this.http.get(this.service + 'Users/getbyid/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(user:UserDto) {
    return this.http.post(this.service + 'Users/insertdto', user, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(user:UserDto) {
    return this.http.put(this.service + 'Users/updatedto', user, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'Users/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}

