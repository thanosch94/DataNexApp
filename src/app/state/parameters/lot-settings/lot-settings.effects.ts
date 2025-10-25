import { Injectable } from "@angular/core";
import { LotSettingsDto } from "../../../dto/configuration/lot-settings.dto";
import { Actions } from "@ngrx/effects";
import { createDeleteByIdEffect, createGetAllEffect, createInsertUpdateEffect } from "../../shared/effects.factory";
import { LotSettingsService } from "../../../services/parameters/lot-settings.service";
import { DeleteLotSettings, GetAllLotSettings, InsertLotSettings, UpdateLotSettings } from "./lot-settings.actions";
import { Guid } from "guid-typescript";

type EffectType = LotSettingsDto;
@Injectable()
export class LotSettingsEffects {
  constructor(
    private service: LotSettingsService,
    private actions$: Actions
  ) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllLotSettings,
    () => this.service.GetAll()
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertLotSettings,
    (dto: EffectType) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdateLotSettings,
    (dto: EffectType) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeleteLotSettings,
    (id: Guid) => this.service.DeleteById(id)
  );
}
