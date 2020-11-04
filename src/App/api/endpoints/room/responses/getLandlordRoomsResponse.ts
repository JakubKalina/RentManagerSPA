import { ICollectionResponse } from 'App/types/pagination/pagination';
export interface GetLandlordRoomsResponse extends ICollectionResponse<RoomForGetLandlordRoomsResponse> {}

export interface RoomForGetLandlordRoomsResponse {
    id: number;
    name: string;
}