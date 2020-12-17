import { defaultPageQueryParams } from './../../common/utils/pagination.utilities';
import { UserForGetUsersResponse } from "App/api/endpoints/account/responses/getUsersResponse";
import { GetUsersRequest } from "App/api/endpoints/account/requests/getUsersRequest";
import StatusType from "App/types/requestStatus";
import { GetUserDetailsResponse } from 'App/api/endpoints/account/responses/getUserDetailsResponse';
import { ConversationForGetConversationsResponse } from 'App/api/endpoints/message/responses/getConversationsResponse';
import { GetConversationsRequest } from 'App/api/endpoints/message/requests/getConversationsRequest';
import { GetConversationMessagesRequest } from 'App/api/endpoints/message/requests/getConversationMessagesRequest';
import { MessageForGetConversationMessagesResponse } from 'App/api/endpoints/message/responses/getConversationMessagesResponse';

const { INITIAL } = StatusType;

export interface MessagesState {
    status: {
        getConversations: StatusType;
        getConversationMessages: StatusType;
        sendMessage: StatusType;
    };
    error: string[];
    conversations: ConversationForGetConversationsResponse[];
    getConversationsParams: GetConversationsRequest;
    getConversationsTotalPages: number;
    messages: MessageForGetConversationMessagesResponse[];
    getMessagesParams: GetConversationMessagesRequest;
    getMessagesTotalPages: number;
}

export const messagesInitialState: MessagesState = {
    status: {
        getConversations: INITIAL,
        getConversationMessages: INITIAL,
        sendMessage: INITIAL
    },
    error: null,
    conversations: [],
    getConversationsParams: defaultPageQueryParams,
    getConversationsTotalPages: 0,
    messages: [],
    getMessagesParams: null,
    getMessagesTotalPages: 0
}