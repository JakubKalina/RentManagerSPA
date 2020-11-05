import { RoomForGetLandlordRoomsResponse } from './../../../api/endpoints/room/responses/getLandlordRoomsResponse';
import { StatusType } from 'App/types/requestStatus';

const { INITIAL } = StatusType;

export interface LandlordRoomsState {
    status: {
        getRooms: StatusType;
        createRoom: StatusType;
        deleteRoom: StatusType;
    };
    error: string[];
    rooms: RoomForGetLandlordRoomsResponse[];
}

export const LandlordRoomsInitialState: LandlordRoomsState = {
    status: {
        getRooms: INITIAL,
        createRoom: INITIAL,
        deleteRoom: INITIAL
    },
    error: null,
    rooms: []
};