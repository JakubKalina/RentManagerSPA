import { HttpStatusCodeResponse } from 'App/types/httpResponse.d';
import { SendMessageRequest } from './requests/sendMessageRequest';
import { requests } from './../../agent/agent';
import { GetConversationsResponse } from './responses/getConversationsResponse';
import { GetConversationsRequest } from './requests/getConversationsRequest';
import { GetConversationMessagesRequest } from './requests/getConversationMessagesRequest';
import { GetConversationMessagesResponse } from './responses/getConversationMessagesResponse';
export const MessageApi = {
    getConversations: (params: GetConversationsRequest): Promise<GetConversationsResponse> =>
    requests.get(`/message/conversations`, params),

    getConversationMessages: (params: GetConversationMessagesRequest): Promise<GetConversationMessagesResponse> =>
    requests.get(`/message/conversation`, params),

    sendMessage: (body: SendMessageRequest): Promise<HttpStatusCodeResponse> =>
    requests.post(`/message`, body)
}