import { GetLandlordRoomsResponse } from './../../../api/endpoints/room/responses/getLandlordRoomsResponse';
import { LandlordRoomsInitialState, LandlordRoomsState } from './rooms.state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StatusType from "App/types/requestStatus";
import { landlordFlatsInitialState } from '../flats/flats.state';

const { FAILED, LOADING, SUCCESS } = StatusType;


export const landlordRoomsSlice = createSlice({
    name: 'landlord-rooms',
    initialState: LandlordRoomsInitialState,
    reducers: {
        getRoomsStart: (state: LandlordRoomsState) => {
            state.status.getRooms = LOADING;
            state.error = null;
            state.rooms = [];
        },
        getRoomsSuccess: (state: LandlordRoomsState, action: PayloadAction<GetLandlordRoomsResponse>) => {
            state.status.getRooms = SUCCESS;
            state.rooms = action.payload.data;
        },
        getRoomsFailure: (state: LandlordRoomsState, action: PayloadAction<string[]>) => {
            state.status.getRooms = FAILED;
            state.error = action.payload;
        },

        createRoomStart: (state: LandlordRoomsState) => {
            state.error = null;
            state.status.createRoom = LOADING;
        },
        createRoomSuccess: (state: LandlordRoomsState, action: PayloadAction<string[]>) => {
            state.status.createRoom = SUCCESS;
        },
        createRoomFailure: (state: LandlordRoomsState, action: PayloadAction<string[]>) => {
            state.status.createRoom = FAILED;
            state.error = action.payload;
        },

        deleteRoomStart: (state: LandlordRoomsState) => {
            state.status.deleteRoom = LOADING;
            state.error = null;
        },
        deleteRoomSuccess: (state: LandlordRoomsState, action: PayloadAction<number>) => {
            state.status.deleteRoom = SUCCESS;
            state.rooms = state.rooms.filter((r) => r.id !== action.payload);
        },
        deleteRoomFailure: (state: LandlordRoomsState, action: PayloadAction<string[]>) => {
            state.status.deleteRoom = FAILED;
            state.error = action.payload;
        },

        // Cleanup
        cleanUpRoomStatus: (state: LandlordRoomsState) => {
            state.error = LandlordRoomsInitialState.error;
            state.status = LandlordRoomsInitialState.status;
        },
    }
});


export const {
    getRoomsStart,
    getRoomsSuccess,
    getRoomsFailure,

    createRoomStart,
    createRoomSuccess,
    createRoomFailure,

    deleteRoomStart,
    deleteRoomSuccess,
    deleteRoomFailure,

    cleanUpRoomStatus    
} = landlordRoomsSlice.actions;