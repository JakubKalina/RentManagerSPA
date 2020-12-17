import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StatusType from 'App/types/requestStatus';
import { GetUserReviewsResponse } from 'App/api/endpoints/review/responses/getUserReviewsResponse';
import { messagesInitialState, MessagesState } from './messages.state';
import { GetConversationsResponse } from 'App/api/endpoints/message/responses/getConversationsResponse';
import { GetConversationMessagesResponse } from 'App/api/endpoints/message/responses/getConversationMessagesResponse';

const { FAILED, LOADING, SUCCESS } = StatusType;

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: messagesInitialState,
    reducers: {

        getConversationsStart: (state: MessagesState) => {
            state.status.getConversations = LOADING;
            state.error = null;
            state.conversations = [];
        },
        getConversationsSuccess: (state: MessagesState, action: PayloadAction<GetConversationsResponse>) => {
            state.status.getConversations = SUCCESS;
            state.conversations = action.payload.data;
        },
        getConversationsFailure: (state: MessagesState, action: PayloadAction<string[]>) => {
            state.status.getConversations = FAILED;
            state.error = action.payload;
        },


        getConversationMessagesStart: (state: MessagesState) => {
            state.status.getConversationMessages = LOADING;
            state.error = null;
            state.messages = [];
        },
        getConversationMessagesSuccess: (state: MessagesState, action: PayloadAction<GetConversationMessagesResponse>) => {
            state.status.getConversationMessages = SUCCESS;
            state.messages = action.payload.data;
        },
        getConversationMessagesFailure: (state: MessagesState, action: PayloadAction<string[]>) => {
            state.status.getConversationMessages = FAILED;
            state.error = action.payload;
        },



        sendMessageStart: (state: MessagesState) => {
            state.status.sendMessage = LOADING;
            state.error = null;
        },
        sendMessageSuccess: (state: MessagesState) => {
            state.status.sendMessage = SUCCESS;
        },
        sendMessageFailure: (state: MessagesState, action: PayloadAction<string[]>) => {
            state.status.sendMessage = FAILED;
            state.error = action.payload;
        },



        
    }
})

export const {

    getConversationsStart,
    getConversationsSuccess,
    getConversationsFailure,

    getConversationMessagesStart,
    getConversationMessagesSuccess,
    getConversationMessagesFailure,

    sendMessageStart,
    sendMessageSuccess,
    sendMessageFailure


} = messagesSlice.actions;