import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AppPermissionDto } from '../dto/configuration/app-permission.dto';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class AppPermissionsService {
 service: string;
  constructor(private http: HttpClient, private auth:AuthService) {
    this.service = this.auth.getApiService();

  }

  public GetAll() {
    return this.http.get(this.service + 'AppPermissions/getall', {
      headers: this.auth.headers,
    });
  }

  public GetByEntityId(id: Guid) {
    return this.http.get(this.service + 'AppPermissions/getByEntityId/' + id, {
      headers: this.auth.headers,
    });
  }

  public InsertDto(appPermissionDto: AppPermissionDto) {
    return this.http.post(this.service + 'AppPermissions/insertdto', appPermissionDto, {
      headers: this.auth.headers,
    });
  }

  public UpdateDto(appPermissionDto: AppPermissionDto) {
    return this.http.put(this.service + 'AppPermissions/updatedto', appPermissionDto, {
      headers: this.auth.headers,
    });
  }

  public DeleteById(id: Guid) {
    return this.http.delete(this.service + 'AppPermissions/deletebyid/' + id, {
      headers: this.auth.headers,
    });
  }
}
