import { ConnectorParametersDto } from '../../../dto/connector-parameters.dto';
import { addGetAction, addInsertAction, addUpdateAction, addDeleteAction } from '../../shared/actions.factory';

export const GetAllCntorParameters = addGetAction<ConnectorParametersDto>('[Connector Parameters] Get All ');

export const InsertCntorParameters = addInsertAction<ConnectorParametersDto>('[Connector Parameters] Insert Dto')

export const UpdateCntorParameters = addUpdateAction<ConnectorParametersDto>('[Connector Parameters] Update Dto')

export const DeleteCntorParameters = addDeleteAction<ConnectorParametersDto>('[Connector Parameters] Delete By Id')
