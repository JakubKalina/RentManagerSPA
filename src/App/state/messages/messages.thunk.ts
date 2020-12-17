import { GetConversationsRequest } from "App/api/endpoints/message/requests/getConversationsRequest";
import { AppThunk } from "../store";
import { getConversationsStart, getConversationsFailure, getConversationsSuccess, getConversationMessagesFailure, getConversationMessagesStart, getConversationMessagesSuccess, sendMessageStart, sendMessageSuccess, sendMessageFailure } from "./messages.slice";
import agent from "App/api/agent/agent";
import { GetConversationMessagesRequest } from "App/api/endpoints/message/requests/getConversationMessagesRequest";
import { SendMessageRequest } from "App/api/endpoints/message/requests/sendMessageRequest";


export const getConversations = (params: GetConversationsRequest): AppThunk => async (dispatch) => {
    dispatch(getConversationsStart());
    agent.Message.getConversations(params)
        .then((response) => dispatch(getConversationsSuccess(response)))
        .catch((error) => dispatch(getConversationsFailure(error)));
};

export const getConversationMessages = (params: GetConversationMessagesRequest): AppThunk => async (dispatch) => {
    dispatch(getConversationMessagesStart());
    agent.Message.getConversationMessages(params)
        .then((response) => {
            dispatch(getConversationMessagesSuccess(response))
        })
        .catch((error) => {
            dispatch(getConversationMessagesFailure(error))
        });
};

export const sendMessage = (message: SendMessageRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(sendMessageStart());
    agent.Message.sendMessage(message)
        .then((response) => {
            dispatch(sendMessageSuccess());
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane'];
			onError(err);
            dispatch(sendMessageFailure(error))
        });
};