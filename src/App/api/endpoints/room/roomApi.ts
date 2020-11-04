import { CreateRoomRequest } from './requests/createRoomRequest';
import { requests } from './../../agent/agent';
import { GetLandlordRoomsResponse } from './responses/getLandlordRoomsResponse';
import { HttpStatusCodeResponse } from 'App/types/httpResponse';

export const RoomApi = {
    getRooms: (flatId: number): Promise<GetLandlordRoomsResponse> =>
    requests.get(`/room/${flatId}/landlord`),

    createRoom: (body: CreateRoomRequest): Promise<HttpStatusCodeResponse> =>
    requests.post(`/room`, body),

    deleteRoom: (flatId: number, roomId: number): Promise<HttpStatusCodeResponse> =>
    requests.delete(`/room/${flatId}/${roomId}`)
}