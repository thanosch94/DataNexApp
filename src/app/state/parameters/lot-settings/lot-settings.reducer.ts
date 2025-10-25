import { createReducer, on } from '@ngrx/store';
import { LotSettingsDto } from '../../../dto/configuration/lot-settings.dto';
import {
  DeleteLotSettings,
  GetAllLotSettings,
  InsertLotSettings,
  UpdateLotSettings,
} from './lot-settings.actions';

export interface LotSettingsState {
  data: LotSettingsDto[];
  error: string | null;
}

export const initialLotSettingsState: LotSettingsState = {
  data: [],
  error: null,
};

const setError = (
  state: LotSettingsState,
  error: string | null
): LotSettingsState => ({
  ...state,
  error,
});

export const lotSettingsReducer = createReducer(
  initialLotSettingsState,

  //GetAll
  on(GetAllLotSettings.action, (state) => ({ ...state })),
  on(GetAllLotSettings.actionSuccess, (state, { data }) => ({
    ...state,
    data,
  })),
  on(GetAllLotSettings.actionFailure, (state, { error }) =>
    setError(state, error)
  ),

  //UpdateDto
  on(UpdateLotSettings.actionSuccess, (state, { dto }) => ({
    ...state,
    data: state.data.map((p: LotSettingsDto) => (p.Id == dto.Id ? dto : p)),
  })),
  on(UpdateLotSettings.actionFailure, (state, { error }) =>
    setError(state, error)
  ),

  //InsertDto
  on(InsertLotSettings.actionSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data, dto],
  })),
  on(InsertLotSettings.actionFailure, (state, { error }) =>
    setError(state, error)
  ),

  //DeleteById
  on(DeleteLotSettings.actionSuccess, (state, { dto }) => ({
    ...state,
    data: [...state.data.filter((x) => x.Id != dto.Id)],
    error: null,
  })),
  on(DeleteLotSettings.actionFailure, (state, { error }) =>
    setError(state, error)
  )
);
