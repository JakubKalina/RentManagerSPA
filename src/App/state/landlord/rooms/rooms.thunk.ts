import { CreateRoomRequest } from './../../../api/endpoints/room/requests/createRoomRequest';
import { AppThunk } from 'App/state/store';
import { getRoomsStart, getRoomsSuccess, createRoomStart, createRoomSuccess, createRoomFailure, deleteRoomStart, deleteRoomSuccess, deleteRoomFailure, getRoomsFailure } from './rooms.slice';
import agent from 'App/api/agent/agent';
import { deleteFlatFailure } from '../flats/flats.slice';

export const getRooms = (flatId: number): AppThunk => async (dispatch) => {
    dispatch(getRoomsStart());
    agent.Room.getLandlordRooms(flatId)
        .then((response) => {
            dispatch(getRoomsSuccess(response));
        })
        .catch((error) => dispatch(getRoomsFailure(error)));
};

export const createRoom = (roomToCreate: CreateRoomRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(createRoomStart());
    agent.Room.createRoom(roomToCreate)
        .then(() => {
            dispatch(createRoomSuccess());
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane'];
			onError(err);
            dispatch(createRoomFailure(error));
        });
};

export const deleteRoom = (flatId: number, roomId: number): AppThunk => async (dispatch) => {
    dispatch(deleteRoomStart());
    agent.Room.deleteRoom(flatId, roomId)
        .then(() => dispatch(deleteRoomSuccess(roomId)))
        .catch((error) => dispatch(deleteRoomFailure(error)));
};