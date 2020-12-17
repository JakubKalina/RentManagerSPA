import React, { useState } from "react";
import StatusType from "App/types/requestStatus";
import { Row, Col, Alert, Select, PageHeader } from "antd";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Store } from "antd/lib/form/interface";

import { sendMessage } from "App/state/messages/messages.thunk";
import { SendMessageRequest } from "App/api/endpoints/message/requests/sendMessageRequest";
import SendMessageForm from "../components/SendMessageForm";




interface RouteParams {
	recipientId: string;
}

interface MessagePageSendMessageContainerProps extends RouteComponentProps<RouteParams> {}


const MessagePageSendMessageContainer: React.FC<MessagePageSendMessageContainerProps> = ({match}: MessagePageSendMessageContainerProps) => {

	const dispatch = useDispatch();
	const history = useHistory();
    
    const recipientId = match.params.recipientId;

    
    const [sendMessageError, setSendMessageError] = useState<string[] | boolean>(false);
    

        
        const sendMessageFormHandler = (value: SendMessageRequest) => {
    
            let handleSuccess: () => void = () => {
                history.push(`/messages/${recipientId}`);
            };
    
            let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
                setSendMessageError(errors);
            };
                        
            dispatch(
                sendMessage({
                    message: value.message,
                    receiverId: recipientId
                }, handleSuccess, handleError)
            );
    
        }

	return (
        <div className='add-tenancy--container'>
            <Row align='middle' justify='center'>
                <Col xs={22} md={14} xl={10} xxl={8}>
                    <br />
                    {sendMessageError && (
                        <Alert
                            message='Błąd'
                            type='error'
                            showIcon
                            closable
                            description={sendMessageError}
                            className='w-100'
                        />
                    )}
                    <PageHeader title={'Wyślij nową wiadomość'} />

                        <SendMessageForm
                        className='send-message-form'
                        name='sendMessageForm'
                        size='large'
                        onFinish={sendMessageFormHandler}
                        autoComplete='off'
                        />

                </Col>
            </Row>
    </div>
	);
};

export default MessagePageSendMessageContainer;