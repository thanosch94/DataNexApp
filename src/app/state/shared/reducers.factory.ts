import { on } from '@ngrx/store';

export interface GeneralState {
  data: any[];
  lookup:any[];
  error: any;
}

const setError = <T>(state: T, error: string | null): T => ({
  ...state,
  error,
});

export const createGetAllReducer = (
  getAllAction: any
) => {
  return [
    on(getAllAction.action, (state: GeneralState) => ({ ...state })),
    on(getAllAction.actionSuccess, (state: GeneralState, { data }) => ({
      ...state,
      data,
    })),
    on(getAllAction.actionFailure, (state: GeneralState, { error }) =>
      setError<GeneralState>(state, error)
    ),
  ];
};

export const createInsertReducer = (
  insertAction: any
) => {
  return [
    on(insertAction.actionSuccess, (state: GeneralState, { dto }) => ({
      ...state,
      data: [...state.data, dto],
    })),
    on(insertAction.actionFailure, (state: GeneralState, { error }) =>
      setError(state, error)
    ),
  ];
};

export const createUpdateReducer = (
  updateAction: any
) => {
  return [
    on(updateAction.actionSuccess, (state: GeneralState, { dto }) => ({
      ...state,
      data: state.data.map((p: any) => (p.Id == dto.Id ? dto : p)),
    })),
    on(updateAction.actionFailure, (state: GeneralState, { error }) =>
      setError(state, error)
    ),
  ];
};

export const createDeleteReducer =(
  deleteAction: any
) => {
  return [
    on(deleteAction.actionSuccess, (state: GeneralState, { dto }) => ({
      ...state,
      data: [...state.data.filter((x) => x.Id != dto.Id)],
      error: null,
    })),
    on(deleteAction.actionFailure, (state: GeneralState, { error }) =>
      setError(state, error)
    ),
  ];
};
