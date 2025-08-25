import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DeleteCustomer, GetAllCustomers, GetCustomerById, InsertCustomer, UpdateCustomer } from './customers.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomersService } from '../../../services/customers.service';

@Injectable()
export class CustomersEffects {
  constructor(
    private customersService: CustomersService,
    private actions$: Actions,
  ) {}

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllCustomers.action),
      mergeMap(() =>
        this.customersService.GetAll().pipe(
          map((customers: any) => GetAllCustomers.actionSuccess({ data: customers })),
          catchError((error: any) => {
            return of(GetAllCustomers.actionFailure({ error }));
          })
        )
      )
    )
  );

  getById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCustomerById.action),
      mergeMap((action: any) =>
        this.customersService
          .GetById(action.id)
          .pipe(
            map((customer: any) =>
              GetCustomerById.actionSuccess({ dto:customer })),
            catchError((error:any)=>{
              return of(GetCustomerById.actionFailure({error}))
            })
          )
      )
    )
  );

  insertCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InsertCustomer.action),
      mergeMap((action: any) =>
        this.customersService.InsertDto(action.dto).pipe(
          map((insertedCustomer: any) =>
            InsertCustomer.actionSuccess({ dto: insertedCustomer })
          ),
          catchError((error: any) => {
            return of(InsertCustomer.actionFailure({ error }));
          })
        )
      )
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateCustomer.action),
      mergeMap((action: any) =>
        this.customersService.UpdateDto(action.dto).pipe(
          map((updatedCustomer: any) =>
            UpdateCustomer.actionSuccess({ dto: updatedCustomer })
          ),
          catchError((error: any) => {
            return of(UpdateCustomer.actionFailure({ error }));
          })
        )
      )
    )
  );

  deleteById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteCustomer.action),
      mergeMap((action: any) =>
        this.customersService
          .DeleteById(action.id)
          .pipe(
            map((customer: any) =>
              DeleteCustomer.actionSuccess({ dto:customer })),
            catchError((error:any)=>{
              return of(DeleteCustomer.actionFailure({error}))
            })
          )
      )
    )
  );
}
