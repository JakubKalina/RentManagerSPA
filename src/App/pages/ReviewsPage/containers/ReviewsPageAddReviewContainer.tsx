import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { getUserReviews, createTenantReview } from "App/state/reviews/reviews.thunk";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Row, Col, Table, Card, Modal, Button, Form, Avatar, Input, Tag, Alert, PageHeader } from "antd";
import StatusType from "App/types/requestStatus";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { getUserDetails } from "App/state/users/users.thunk";
import { Store } from "antd/lib/form/interface";
import { CreateTenantReviewRequest } from "App/api/endpoints/review/requests/createTenantReviewRequest";
import LoadingScreen from "App/common/components/LoadingScreen";
import CreateTenantReviewForm from "../components/CreateTenantReviewForm";

interface RouteParams {
    userId: string;
    flatId: string;
}

interface ReviewsPageAddReviewContainerProps extends RouteComponentProps<RouteParams> {}

const { LOADING, SUCCESS } = StatusType;




const ReviewsPageAddReviewContainer: React.FC<ReviewsPageAddReviewContainerProps> = ({ match}: ReviewsPageAddReviewContainerProps) => {

    const userId = match.params.userId;
    
    const flatId = Number(match.params.flatId);


    const dispatch = useDispatch();
    const history = useHistory();
    type FinishFormType = (values: Store) => void;

    const [createReviewError, setCreateReviewError] = useState<string[] | boolean>(false);




    const updateFlatHandler: FinishFormType = (values: CreateTenantReviewRequest) => {
        
        let handleSuccess: () => void = () => {
			history.push(`/landlord/flats/${flatId}`);
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
			setCreateReviewError(errors);
		};

		setCreateReviewError(false);

		dispatch(
			createTenantReview(
				{
                    userToId: userId,
                    rate: Number(values.rate),
                    description: values.description,
                    flatId: flatId
				}
			, 
			handleSuccess,
			handleError
			)
		);
	};

    
    return (
		<div className='login--container'>
				<Row align='middle' justify='center'>
					<Col xs={22} md={14} xl={10} xxl={8}>
						<br />
						{createReviewError && (
							<Alert
								message='Błąd'
								type='error'
								showIcon
								closable
								description={createReviewError}
								className='w-100'
							/>
						)}
						<PageHeader title={'Oceń najemcę'} />
						<CreateTenantReviewForm
							className='login-form'
							name='loginForm'
							size='large'
							onFinish={updateFlatHandler}
							autoComplete='off'
						/>
					</Col>
				</Row>
		</div>

    );
};

export default ReviewsPageAddReviewContainer;