import { Injectable } from "@angular/core";
import { LogDto } from "../../dto/log.dto";
import { Actions } from "@ngrx/effects";
import { GetAllLogs } from "./logs.actions";
import { createGetAllEffect } from "../shared/effects.factory";
import { LogsService } from "../../services/logs.service";

type EffectType = LogDto;
@Injectable()
export class LogsEffects {

  constructor(
    private service: LogsService,
    private actions$: Actions
  ) {}

  getAll$ = createGetAllEffect<EffectType>(
    this.actions$,
    GetAllLogs,
    () => this.service.GetAll()
  );
}
