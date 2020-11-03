import { ICollectionResponse } from 'App/types/pagination/pagination';
export interface GetConversationsResponse extends ICollectionResponse<ConversationForGetConversationsResponse> {}

export interface ConversationForGetConversationsResponse {
    user: UserForConversationForGetConversationsResponse;
    message: MessageForConversationForGetConversationsResponse;
}

export interface UserForConversationForGetConversationsResponse {
    id: string;
    firstName: string;
    lastName: string;
}

export interface MessageForConversationForGetConversationsResponse {
    content: string;
    timestamp: Date;
}