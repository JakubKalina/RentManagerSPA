import { HttpStatusCodeResponse } from 'App/types/httpResponse.d';
import { SendMessageRequest } from './requests/sendMessageRequest';
import { requests } from './../../agent/agent';
import { GetConversationsResponse } from './responses/getConversationsResponse';
import { GetConversationsRequest } from './requests/getConversationsRequest';
import { GetConversationMessagesRequest } from './requests/getConversationMessagesRequest';
import { GetConversationMessagesResponse } from './responses/getConversationMessagesResponse';
export const MessageApi = {
    getConversations: (body: GetConversationsRequest): Promise<GetConversationsResponse> =>
    requests.get(`/message/conversations`),

    getConversationMessages: (body: GetConversationMessagesRequest): Promise<GetConversationMessagesResponse> =>
    requests.get(`/message/conversation`),

    sendMessage: (body: SendMessageRequest): Promise<HttpStatusCodeResponse> =>
    requests.post(`/message`, body)
}