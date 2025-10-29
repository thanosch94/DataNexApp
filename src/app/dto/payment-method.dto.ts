import { Guid } from 'guid-typescript';

export interface PaymentMethodDto {
  Id: Guid;
  Name: string;
  Notes?:string;
  IsActive:boolean;
}
