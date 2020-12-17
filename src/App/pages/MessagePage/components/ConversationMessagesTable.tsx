import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Tag, Button, Modal, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { deleteUser } from 'App/state/admin/users/users.thunk';
import { UserForGetUsersResponse } from 'App/api/endpoints/admin/responses/getUsersResponse';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import { deleteFlat } from 'App/state/landlord/flats/flats.thunk';
import { ConversationForGetConversationsResponse } from 'App/api/endpoints/message/responses/getConversationsResponse';
import { MessageForGetConversationMessagesResponse } from 'App/api/endpoints/message/responses/getConversationMessagesResponse';

export const renderMessagesTableColumns = (conversationMessages: MessageForGetConversationMessagesResponse[], recipientId: string, dispatch: Dispatch<any>) => [

    { title: 'Wiadomość', dataIndex: 'content' },
    { title: 'Nadawca',
    render: (record: MessageForGetConversationMessagesResponse) => (

        <>
            {
                recipientId === record.userFromId?'':        <Tag.CheckableTag checked={true} style={{marginBottom: "10px"}} >
                    Ja
                </Tag.CheckableTag>
            }
        </>

    )
},

];



