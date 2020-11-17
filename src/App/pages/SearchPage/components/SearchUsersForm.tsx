import React from "react";
import { Input, Form, Button, Row, Col } from "antd";
import { FormProps } from "antd/lib/form";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import './SearchUsersForm.less';


interface SearchUsersFormProps extends FormProps {
}

const SearchUsersForm: React.FC<SearchUsersFormProps> = (props: SearchUsersFormProps) => {

    return (
                    <Form {...props}>
        <Row align='middle' justify='center'>

                <Col xs={18} md={18} xl={18} xxl={18}>
                        <Form.Item
                            name="query"
                        >
                            <Input 
                            prefix={<UserOutlined className='site-form-item-icon' />}
                            placeholder={'Wyszukaj po imieniu, nazwisku lub identyfikatorze'}
                            />

                        </Form.Item>

                </Col>

                <Col xs={5} md={5} xl={5} xxl={5}>

                        <Form.Item style={{marginLeft: '5px'}}>
                            <Button className='f-left register-form-button' type='primary' htmlType='submit' size='large'>
                                {'Szukaj'}
                            </Button>
                        </Form.Item>
                </Col>
        
        </Row>
    </Form>
    );
};

export default SearchUsersForm;
