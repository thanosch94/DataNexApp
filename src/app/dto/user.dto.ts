import { Guid } from 'guid-typescript';
import { CompanyDto } from './company.dto';

export class UserDto {
  Id: Guid;
  SerialNumber?: number;
  Code?: string;
  Name: string;
  Email: string;
  UserName: string;
  Password: string;
  UserRole: Guid;
  //UserRole:UserRolesEnum;
  CompanyId: Guid;
  Token?: string;
  Company: CompanyDto;
  Image: any;
  Country?: string;
  City: string;
  PostalCode: string;
  Address: string;
  Notes: string;
  Phone2: string;
  Phone1: string;
  BirthDay: Date | number | string;
  Occupation: string;
  FacebookUrl: string;
  InstagramUrl: string;
  LinkedInUrl: string;
  IsActive: boolean;
}
