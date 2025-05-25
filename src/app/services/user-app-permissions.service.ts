import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserAppPermissionDto } from '../dto/configuration/user-app-permission.dto';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class UserAppPermissionsService {
service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();

  }

  public GetAll() {
    return this.http.get(this.service + 'UserAppPermissions/getall', {
      headers: this.auth.headers,
    });
  }

  public GetByUserId(id: Guid) {
    return this.http.get(this.service + 'UserAppPermissions/getByUserId/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(userAppPermissionDto: UserAppPermissionDto) {
    return this.http.post(this.service + 'UserAppPermissions/insertdto', userAppPermissionDto, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(userAppPermissionDto: UserAppPermissionDto) {
    return this.http.put(this.service + 'UserAppPermissions/updatedto', userAppPermissionDto, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'UserAppPermissions/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}
