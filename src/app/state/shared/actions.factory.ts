import { createAction, props } from "@ngrx/store";
import { Guid } from "guid-typescript";

export function addGetAction<T>(entityName: string) {
  return {
    action: createAction(`${entityName}`),
    actionSuccess: createAction(`${entityName} Success`, props<{ data: T[] }>()),
    actionFailure: createAction(`${entityName} Failure`, props<{ error: any }>()),
  };
}

export function addGetByEntityIdAction<T>(entityName: string) {
  return {
    action: createAction(`${entityName}`, props<{id:Guid}>()),
    actionSuccess: createAction(`${entityName} Success`, props<{ data: T[] }>()),
    actionFailure: createAction(`${entityName} Failure`, props<{ error: any }>()),
  };
}

export function addGetByDatasourceIdAction<T>(datasourceName: string) {
  return {
    action: createAction(`${datasourceName}`, props<{id:Guid}>()),
    actionSuccess: createAction(`${datasourceName} Success`, props<{ data: T[] }>()),
    actionFailure: createAction(`${datasourceName} Failure`, props<{ error: any }>()),
  };
}

export function addGetByIdAction<T>(entityName: string) {
  return {
    action: createAction(`${entityName}`, props<{id:Guid}>()),
    actionSuccess: createAction(`${entityName} Success`, props<{ dto: T }>()),
    actionFailure: createAction(`${entityName} Failure`, props<{ error: any }>()),
  };
}

export function addInsertAction<T>(entityName: string) {
  return {
    action: createAction(`${entityName}`, props<{dto:T}>()),
    actionSuccess: createAction(`${entityName} Success`, props<{dto:T}>()),
    actionFailure: createAction(`${entityName} Failure`, props<{ error: any }>()),
  };
}

export function addUpdateAction<T>(entityName: string) {
  return {
    action: createAction(`${entityName}`, props<{dto:T}>()),
    actionSuccess: createAction(`${entityName} Success`, props<{dto:T}>()),
    actionFailure: createAction(`${entityName} Failure`, props<{ error: any }>()),
  };
}

export function addDeleteAction<T>(entityName: string) {
  return {
    action: createAction(`${entityName}`, props<{id:Guid}>()),
    actionSuccess: createAction(`${entityName} Success`, props<{dto:T}>()),
    actionFailure: createAction(`${entityName} Failure`, props<{ error: any }>()),
  };
}
