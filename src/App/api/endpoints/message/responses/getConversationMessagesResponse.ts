import { ICollectionResponse } from 'App/types/pagination/pagination';
export interface GetConversationMessagesResponse extends ICollectionResponse<MessageForGetConversationMessagesResponse> {}

export interface MessageForGetConversationMessagesResponse {
    id: number;
    content: string;
    timeStamp: Date;
    userFromId: string;
    userToId: string;
}