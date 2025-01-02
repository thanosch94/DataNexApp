import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CompaniesService } from './../../../services/parameters/companies.service';
import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, of } from 'rxjs';
import { GetAllCompanies, GetAllCompaniesFailure, GetAllCompaniesSuccess, GetCompaniesLookup, GetCompaniesLookupFailure, GetCompaniesLookupSuccess, InsertCompanyDto, InsertCompanyDtoFailure, InsertCompanyDtoSuccess, UpdateCompanyDto, UpdateCompanyDtoFailure, UpdateCompanyDtoSuccess } from './companies.actions';

@Injectable()
export class CompaniesEffects {
constructor(
    private companiesService: CompaniesService,
    private actions$: Actions,
  ) {}

  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAllCompanies),
      mergeMap(() =>
        this.companiesService.GetAll().pipe(
          map((brands: any) => GetAllCompaniesSuccess({ data: brands })),
          catchError((error: any) => {
            return of(GetAllCompaniesFailure({ error }));
          })
        )
      )
    )
  );

  loadCompaniesLookup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCompaniesLookup),
      mergeMap(() =>
        this.companiesService.GetAll().pipe(
          map((brands: any) => GetCompaniesLookupSuccess({ data: brands })),
          catchError((error: any) => {
            return of(GetCompaniesLookupFailure({ error }));
          })
        )
      )
    )
  );

   insertCompany$ = createEffect(() =>
      this.actions$.pipe(
        ofType(InsertCompanyDto),
        mergeMap((action: any) =>
          this.companiesService.InsertDto(action.dto).pipe(
            map((insertedCompany: any) =>
              InsertCompanyDtoSuccess({ dto: insertedCompany })
            ),
            catchError((error: any) => {
              return of(InsertCompanyDtoFailure({ error }));
            })
          )
        )
      )
    );

    updateCompany$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UpdateCompanyDto),
        mergeMap((action: any) =>
          this.companiesService.UpdateDto(action.dto).pipe(
            map((updatedCompany: any) =>
              UpdateCompanyDtoSuccess({ dto: updatedCompany })
            ),
            catchError((error: any) => {
              return of(UpdateCompanyDtoFailure({ error }));
            })
          )
        )
      )
    );
}
