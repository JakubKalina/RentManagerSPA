import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { getUserReviews } from "App/state/reviews/reviews.thunk";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Row, Col, Table, Card, Modal, Button, Form, Avatar, Input, Tag } from "antd";
import StatusType from "App/types/requestStatus";
import { renderReviewsTableColumns } from "./components/ReviewsTable";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { getUserDetails } from "App/state/users/users.thunk";
import { Link } from "react-router-dom";

interface RouteParams {
	userId: string;
}

interface ReviewsPageContainerProps extends RouteComponentProps<RouteParams> {}

const { LOADING, SUCCESS } = StatusType;


const ReviewsPageContainer: React.FC<ReviewsPageContainerProps> = ({ match}: ReviewsPageContainerProps) => {

	const userId = match.params.userId;

	const dispatch = useDispatch();

	const user = useSelector((state: RootState) => state.users.user);
    const userStatus = useSelector((state: RootState) => state.users.status);
    
	const reviews = useSelector((state: RootState) => state.reviews.reviews);
    const reviewsStatus = useSelector((state: RootState) => state.reviews.status.getReviews);

    const userRole = useSelector<RootState>(
		(state: RootState) => {
			let currentRole = state.session.user && state.session.user.roles
			if(currentRole && currentRole.length > 0)
			{
				 return currentRole[0];
			} else return null;
		}
	);

    useEffect(() => {
		dispatch(getUserDetails(userId));
	}, [dispatch]);


	useEffect(() => {
		dispatch(getUserReviews(userId));
	}, [dispatch]);

	const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 8 },
    };

    return (
		<>
        <Row justify='center'>
            <Col xs={22} md={22} xl={10} xxl={10}>
                {userStatus.getUserDetails === LOADING ? null: 
                <Card title="Informacje o użytkowniku" style={{height: '100%'}} className='profile--container--card'>
					<Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>
                        
                        <Row align='middle' justify='center'>

                        
                        <Col  xs={20} md={3} xl={3} xxl={3}>
							<Row>
								<Avatar size={64} icon={<UserOutlined />} />
							</Row>
							<Row>
                            <Tag.CheckableTag checked={true} style={{marginBottom: "10px", marginTop: "10px"}} >
                            {
                                user && user.role==='Landlord'?'Zarządca':""
                            }
                            {
                                user && user.role==='Administrator'?'Administrator':""
                            }
                            {
                                user && user.role==='Tenant'?'Najemca':""
                            }
                            </Tag.CheckableTag>
							</Row>
                        </Col>

                        <Col xs={20} md={0} xl={0} xxl={0}>
                            <br></br>
                        </Col>

                        <Col  xs={22} md={18} xl={18} xxl={18}>

                            <Form {...layout}>

                                <Form.Item
                                    label="Imię"
                                >
                                    <Input disabled={true} style={{cursor: "pointer"}} defaultValue={user?user.firstName:""} />
                                </Form.Item>

                                <Form.Item
                                    label="Nazwisko">
                                    <Input disabled={true} style={{cursor: "pointer"}} defaultValue={user?user.lastName:""} />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                >
                                    <Input disabled={true} style={{cursor: "pointer"}} defaultValue={user?user.email:""} />
                                </Form.Item>

                                <Form.Item
                                    label="Telefon"
                                >
                                    <Input disabled={true} style={{cursor: "pointer"}} defaultValue={user?user.phoneNumber:""} />
                                </Form.Item>

                                </Form>
                        </Col>

                        </Row>


					</Card.Grid>


					<Card.Grid style={{width: '100%', textAlign: "center"}}>

                        <Button  type="primary" style={{width: '200px', margin: "10px"}}>
                        <Link to={`/messages/${userId}/send`}>Wyślij wiadomość</Link>
                        </Button>
                        {userRole && user && userRole === 'Landlord'?

                            <Button  type="primary" style={{width: '200px', margin: "10px"}}>
                                <Link to={`/landlord/tenants/add/${user.id}`}>Dodaj do mieszkania</Link>
                            </Button>
                            : null
                        }
					</Card.Grid>
				</Card>
                } 
            </Col>



            <Col xs={22} md={22} xl={12} xxl={12}>


                <Card title="Opinie" style={{height: '100%'}} className='profile--container--card'>
					<Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>
                              
		 			<Table
		 				loading={reviewsStatus === LOADING}
		 				columns={renderReviewsTableColumns(reviews)}
		 				dataSource={reviews}
		 				rowKey='id'
					/>

					</Card.Grid>

				</Card>

            </Col>

        </Row>
		</> 

    );
};

export default ReviewsPageContainer;