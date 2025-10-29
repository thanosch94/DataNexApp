import { Guid } from 'guid-typescript';

export interface ShippingMethodDto {
  Id: Guid;
  Name: string;
  Notes?:string;
  IsActive:boolean;
}
