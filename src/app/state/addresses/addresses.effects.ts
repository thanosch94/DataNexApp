import { Injectable } from '@angular/core';
import { AddressesService } from '../../services/addresses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  DeleteAddress,
  DeleteCustomerAddress,
  GetAllAddresses,
  InsertAddress,
  InsertCustomerAddress,
  UpdateAddress,
  UpdateCustomerAddress,
} from './addresses.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class AddressesEffects {
  constructor(
    private addressesService: AddressesService,
    private actions$: Actions
  ) {}

  loadAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllAddresses.action),
      mergeMap(() =>
        this.addressesService.GetAll().pipe(
          map((addresses: any) =>
            GetAllAddresses.actionSuccess({ data: addresses })
          ),
          catchError((error: any) => {
            return of(GetAllAddresses.actionFailure({ error }));
          })
        )
      )
    )
  );

  insertAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertAddress.action),
      mergeMap((action: any) =>
        this.addressesService.InsertDto(action.dto).pipe(
          map((insertedAddress: any) =>
            InsertAddress.actionSuccess({ dto: insertedAddress })
          ),
          catchError((error: any) => {
            return of(InsertAddress.actionFailure({ error }));
          })
        )
      )
    )
  );

  updateAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateAddress.action),
      mergeMap((action: any) =>
        this.addressesService.UpdateDto(action.dto).pipe(
          map((updatedAddress: any) =>
            UpdateAddress.actionSuccess({ dto: updatedAddress })
          ),
          catchError((error: any) => {
            return of(UpdateAddress.actionFailure({ error }));
          })
        )
      )
    )
  );

  deleteById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteAddress.action),
      mergeMap((action: any) =>
        this.addressesService.DeleteById(action.id).pipe(
          map((address: any) => DeleteAddress.actionSuccess({ dto: address })),
          catchError((error: any) => {
            return of(DeleteAddress.actionFailure({ error }));
          })
        )
      )
    )
  );

  insertCustomerAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertCustomerAddress.action),
      mergeMap((action: any) =>
        this.addressesService.InsertCustomerAddress(action.dto).pipe(
          map((insertedAddress: any) =>
            InsertCustomerAddress.actionSuccess({ dto: insertedAddress })
          ),
          catchError((error: any) => {
            return of(InsertCustomerAddress.actionFailure({ error }));
          })
        )
      )
    )
  );

  updateCustomerAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateCustomerAddress.action),
      mergeMap((action: any) =>
        this.addressesService.UpdateCustomerAddress(action.dto).pipe(
          map((updatedAddress: any) =>
            UpdateCustomerAddress.actionSuccess({ dto: updatedAddress })
          ),
          catchError((error: any) => {
            return of(UpdateCustomerAddress.actionFailure({ error }));
          })
        )
      )
    )
  );

  deleteCustomerAddressById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteCustomerAddress.action),
      mergeMap((action: any) =>
        this.addressesService.DeleteCustomerAddressById(action.id).pipe(
          map((address: any) =>
            DeleteCustomerAddress.actionSuccess({ dto: address })
          ),
          catchError((error: any) => {
            return of(DeleteCustomerAddress.actionFailure({ error }));
          })
        )
      )
    )
  );
}
