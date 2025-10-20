import { Injectable } from "@angular/core";
import { GeneralOptionsDto } from "../../../dto/configuration/general-options.dto";
import { Actions } from "@ngrx/effects";
import { createDeleteByIdEffect, createGetAllEffect, createInsertUpdateEffect } from "../../shared/effects.factory";
import { GeneralOptionsService } from "../../../services/parameters/general-options.service";
import { DeleteGeneralOptions, GetAllGeneralOptions, InsertGeneralOptions, UpdateGeneralOptions } from "./general-options.actions";
import { Guid } from "guid-typescript";

type EffectType = GeneralOptionsDto;
@Injectable()
export class GeneralOptionsEffects {

  constructor(
    private service: GeneralOptionsService,
    private actions$: Actions
  ) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllGeneralOptions,
    () => this.service.GetAll()
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertGeneralOptions,
    (dto: EffectType) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdateGeneralOptions,
    (dto: EffectType) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeleteGeneralOptions,
    (id: Guid) => this.service.DeleteById(id)
  );
}
