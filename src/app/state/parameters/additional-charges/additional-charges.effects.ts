import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdditionalChargesService } from './../../../services/parameters/additional-charges.service';
import { Injectable } from "@angular/core";
import { DeleteAdditionalChargeById, DeleteAdditionalChargeByIdFailure, DeleteAdditionalChargeByIdSuccess, GetAllAdditionalCharges, GetAllAdditionalChargesFailure, GetAllAdditionalChargesSuccess, InsertAdditionalChargeDto, InsertAdditionalChargeDtoFailure, InsertAdditionalChargeDtoSuccess, UpdateAdditionalChargeDto, UpdateAdditionalChargeDtoSuccess } from './additional-charges.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AdditionalChargesEffects {
  constructor(private additionalChargesService:AdditionalChargesService, private actions$:Actions){

  }

  loadAdditionalCharges$ = createEffect(()=>
  this.actions$.pipe(
    ofType(GetAllAdditionalCharges),
    mergeMap(()=>
    this.additionalChargesService.GetAll().pipe(
      map((additionalCharges:any)=>GetAllAdditionalChargesSuccess({data:additionalCharges})),
      catchError((error)=>{
        return of(GetAllAdditionalChargesFailure({error}))
      })
    ))
  ))

  insertAdditionalCharge$ = createEffect(()=>
  this.actions$.pipe(
    ofType(InsertAdditionalChargeDto),
    mergeMap((action:any)=>
    this.additionalChargesService.InsertDto(action.dto).pipe(
      map((insertedAdditionalCharge:any)=>InsertAdditionalChargeDtoSuccess({dto:insertedAdditionalCharge})),
      catchError((error)=>{
        return of(InsertAdditionalChargeDtoFailure({error}))
      })
    )
    )
  ))

  updateAdditionalCharge$  =createEffect(()=>
  this.actions$.pipe(
    ofType(UpdateAdditionalChargeDto),
    mergeMap((action:any)=>
    this.additionalChargesService.UpdateDto(action.dto).pipe(
      map((updatedAdditionalCharge:any)=>UpdateAdditionalChargeDtoSuccess({dto:updatedAdditionalCharge})),
      catchError((error)=>{
        return of(DeleteAdditionalChargeByIdFailure({error}))
      })
    ))
  ))

  deleteAdditionalCharge$ = createEffect(()=>
  this.actions$.pipe(
    ofType(DeleteAdditionalChargeById),
    mergeMap((action:any)=>
    this.additionalChargesService.DeleteById(action.id).pipe(
      map((deletedAdditionalCharge:any)=>DeleteAdditionalChargeByIdSuccess({dto:deletedAdditionalCharge})),
      catchError((error)=>{
        return of(DeleteAdditionalChargeByIdFailure({error}))
      })
    ))
  ))
}
