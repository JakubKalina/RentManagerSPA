import { ICollectionResponse } from 'App/types/pagination/pagination';
export interface GetUsersResponse extends ICollectionResponse<UserForGetUsersResponse> {}

export interface UserForGetUsersResponse {
    id: string;
    searchId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}