import { IPageQueryParams } from './../../../../types/pagination/pagination.d';
export interface GetConversationMessagesRequest extends IPageQueryParams {
    recipientId: string;
}