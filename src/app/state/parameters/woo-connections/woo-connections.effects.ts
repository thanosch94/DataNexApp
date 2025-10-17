import { Injectable } from "@angular/core";
import { WooConnectionsDataDto } from "../../../dto/woo-connections-data.dto";
import { createDeleteByIdEffect, createGetAllEffect, createInsertUpdateEffect } from "../../shared/effects.factory";
import { DeleteWooConnection, GetAllWooConnections, InsertWooConnection, UpdateWooConnection } from "./woo-connections.actions";
import { Guid } from "guid-typescript";
import { Actions } from "@ngrx/effects";
import { WooConnectionsService } from "../../../services/parameters/woo-connections.service";

type EffectType = WooConnectionsDataDto;
@Injectable()
export class WooConnectionsEffects {
  constructor(private service: WooConnectionsService, private actions$: Actions) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllWooConnections,
    () => this.service.GetAll()
  );

  insert$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    InsertWooConnection,
    (dto: EffectType) => this.service.InsertDto(dto)
  );

  update$ = createInsertUpdateEffect<EffectType>(
    this.actions$,
    UpdateWooConnection,
    (dto: EffectType) => this.service.UpdateDto(dto)
  );

  deleteById$ = createDeleteByIdEffect<EffectType>(
    this.actions$,
    DeleteWooConnection,
    (id: Guid) => this.service.DeleteById(id)
  );
}
