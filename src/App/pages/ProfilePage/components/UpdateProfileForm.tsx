import React from "react";
import { Input, Form, Button } from "antd";
import { FormProps } from "antd/lib/form";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import './UpdateProfileForm.less';
import { updateProfileFormRules } from "../utils/UpdateProfileFormRules";


interface UpdateProfileFormProps extends FormProps {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = (props: UpdateProfileFormProps) => {

    return (
        <Form {...props}>

            <Form.Item
                name="firstName"
            >
                <Input 
                prefix={<UserOutlined className='site-form-item-icon' />}
                defaultValue={props.firstName} 
                required={false}
                />
            </Form.Item>

            <Form.Item
                name="lastName" 
            >
                <Input 
                prefix={<UserOutlined className='site-form-item-icon' />} 
                required={false}
                defaultValue={props.lastName}
                 />
            </Form.Item>

            <Form.Item
                name="phoneNumber"
            >
                <Input 
                prefix={<PhoneOutlined className='site-form-item-icon' />} 
                defaultValue={props.phoneNumber} 

                />
            </Form.Item>

            <Form.Item>
				<Button className='f-left register-form-button' type='primary' htmlType='submit' size='large'>
					{'Zapisz zmiany'}
				</Button>
			</Form.Item>

        </Form>
    );
};

export default UpdateProfileForm;
