import React from "react";
import { Row, Card, Button, Avatar, Form, Input, Tag } from "antd";
import { Link, useHistory } from "react-router-dom";
import './ProfilePageContainer.less';
import { UserOutlined } from "@ant-design/icons";
import { devalidateSession } from "App/state/session/session.thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";


type MouseClickEvent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;


const ProfilePageContainer: React.FC<{}> = () => {

    const user = useSelector((state: RootState) => state.session.user);
    const userStatus = useSelector((state: RootState) => state.session.status);

	const history = useHistory();
    const dispatch = useDispatch();


    const handleLogOutButtonClick: MouseClickEvent = () => {
		dispatch(
			devalidateSession(() => {
				history.push('/');
			})
		);
	};


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
      };

    return (
		<div className='profile--container'>

				<Row align='middle' justify='center'>
				<Card className='profile--container--card'>
					<Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>
                        <Avatar size={64} icon={<UserOutlined />} />
					</Card.Grid>

                    <Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>
                        {/* <Tag.CheckableTag checked={true} style={{marginBottom: "10px"}} >{user?user.roles[0]:""}</Tag.CheckableTag> */}
                        <Tag.CheckableTag checked={true} style={{marginBottom: "10px", marginTop: "10px"}} >
                            {
                                user && user.roles[0]==='Landlord'?'Zarządca':""
                            }
                            {
                                user && user.roles[0]==='Administrator'?'Administrator':""
                            }
                            {
                                user && user.roles[0]==='Tenant'?'Najemca':""
                            }
                            </Tag.CheckableTag>
                    <Form {...layout}>

                        <Form.Item
                            label="Imię"
                        >
                            <Input disabled={true} style={{cursor: "pointer"}} defaultValue={user?user.firstName:""} />
                        </Form.Item>

                        <Form.Item
                            label="Nazwisko"                        >
                            <Input disabled={true} style={{cursor: "pointer"}} defaultValue={user?user.lastName:""} />
                        </Form.Item>

                        <Form.Item
                            label="Adres email"
                        >
                            <Input disabled={true} style={{cursor: "pointer"}} defaultValue={user?user.email:""} />
                        </Form.Item>

                        <Form.Item
                            label="Numer telefonu"
                        >
                            <Input disabled={true} style={{cursor: "pointer"}} defaultValue={user?user.phoneNumber:""} />
                        </Form.Item>

                    </Form>
					</Card.Grid>

					<Card.Grid style={{width: '100%', textAlign: "center"}}>  
						<Link to='/profile/update'>
							<Button type="primary" style={{width: '150px', margin: "10px"}}>Edytuj dane</Button>
						</Link>

                        <Link to='/profile/change-password'>
					    	<Button type="primary" style={{width: '150px', margin: "10px"}}>Zmień hasło</Button>
						</Link>

						<Link to='/'>
					    	<Button onClick={handleLogOutButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Wyloguj</Button>
						</Link>

					</Card.Grid>

				</Card>

				</Row>
		</div>
    );
};

export default ProfilePageContainer;