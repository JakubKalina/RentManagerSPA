import { CreateRoomRequest } from './requests/createRoomRequest';
import { requests } from './../../agent/agent';
import { GetRoomsResponse } from './responses/getRoomsResponse';
import { HttpStatusCodeResponse } from 'App/types/httpResponse';

export const RoomApi = {
    getRooms: (flatId: number): Promise<GetRoomsResponse> =>
    requests.get(`/room/${flatId}`),

    createRoom: (body: CreateRoomRequest): Promise<HttpStatusCodeResponse> =>
    requests.post(`/room`, body),

    deleteRoom: (flatId: number, roomId: number): Promise<HttpStatusCodeResponse> =>
    requests.delete(`/room/${flatId}/${roomId}`)
}