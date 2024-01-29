import { Guid } from 'guid-typescript';

export class CustomerDto {
  Id: Guid;
  Name: string;
  BAddress: string;
  BRegion: string;
  BPostalCode: string;
  BCity: string;
  BCountry: string;
  BPhone1: number;
  BPhone2: number;
  BEmail: string;
  SAddress: string;
  SRegion: string;
  SPostalCode: number;
  SCity: string;
  SCountry: string;
  SPhone1: number;
  SPhone2: number;
  SEmail: string;
}
