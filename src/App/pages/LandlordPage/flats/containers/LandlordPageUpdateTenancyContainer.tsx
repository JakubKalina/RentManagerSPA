import React, { useEffect, useState } from "react";
import StatusType from "App/types/requestStatus";
import { Result, Row, Button, Badge, Col, Typography, Avatar, Input, Table, notification, Modal, Card, Form, Select, Alert, PageHeader } from "antd";
import { UserOutlined, ArrowLeftOutlined, PlusOutlined, HomeOutlined } from "@ant-design/icons";
import LoadingScreen from "App/common/components/LoadingScreen";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { getFlats, createFlat, getFlat } from "App/state/landlord/flats/flats.thunk";
import { cleanUpFlatStatus } from "App/state/landlord/flats/flats.slice";
import { renderTableColumns } from "../components/FlatTable";
import './LandlordPageGetFlatsContainer.less';
import CreateFlatForm from "../components/CreateFlatForm";
import { Store } from "antd/lib/form/interface";
import { CreateFlatRequest } from "App/api/endpoints/flat/requests/createFlatRequest";
import { getRooms } from "App/state/landlord/rooms/rooms.thunk";
import { getTenancies, beginTenancy, updateTenancy, getTenancy } from "App/state/landlord/tenancies/tenancies.thunk";
import { renderRoomsTableColumns } from "../components/RoomsTable";
import { renderTenantsTableColumns } from "../components/TenantsTable";
import AddTenancyForm from "../components/AddTenancyForm";
import { GetFlatTenanciesResponse } from "App/api/endpoints/tenancy/responses/getFlatTenanciesResponse";
import { UpdateTenancyRequest } from "App/api/endpoints/tenancy/requests/updateTenancyRequest";
import UpdateTenancyForm from "../components/UpdateTenancyForm";
import moment from "moment";


const { LOADING, SUCCESS } = StatusType;
const { Option } = Select;


interface RouteParams {
	tenancyId: string;
}

type MouseClickEvent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;


interface LandlordPageUpdateTenancyContainerProps extends RouteComponentProps<RouteParams> {}


const LandlordPageUpdateTenancyContainer: React.FC<LandlordPageUpdateTenancyContainerProps> = ({ match}: LandlordPageUpdateTenancyContainerProps) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const tenancyId = match.params.tenancyId;

    
    const tenancy = useSelector((state: RootState) => state.landlord.tenancies.tenancy);
    const tenancyStatus = useSelector((state: RootState) => state.landlord.tenancies.status.getTenancy);

    const [addTenancyError, setAddTenancyError] = useState<string[] | boolean>(false);

    useEffect(() => {
		dispatch(getTenancy(Number(tenancyId)));

    }, [dispatch]);
    

    // Edycja najmu
    const updateTenancyFormHandler = (value: UpdateTenancyRequest) => {

        let tenancyToUpdate = value;
        tenancyToUpdate.deposit = Number(value.deposit);
        tenancyToUpdate.id = Number(tenancyId);

        let handleSuccess: () => void = () => {
			history.push('/landlord/flats');
		};

		let handleError: (tenancyToUpdate: string[]) => void = (errors: string[]) => {
			setAddTenancyError(errors);
        };
        

        // dispatch(
		// 	updateTenancy({
        //         id: Number(tenancyId),
        //         startDate: new Date(),
        //         endDate: new Date(),
        //         deposit: value.deposit
		// 	}, handleSuccess, handleError)
        // );

        dispatch(
			updateTenancy(value, handleSuccess, handleError)
        );

    }

	return (

        <div className='add-tenancy--container'>
            <Row align='middle' justify='center'>
                <Col xs={22} md={14} xl={10} xxl={8}>
                    <br />
                    {addTenancyError && (
                        <Alert
                            message='Błąd'
                            type='error'
                            showIcon
                            closable
                            description={addTenancyError}
                            className='w-100'
                        />
                    )}
                    <PageHeader title={'Edytuj najem'} />
                    {tenancyStatus === LOADING ? null :
                      <UpdateTenancyForm
                        initialValues={{
                            startDate: tenancy?moment(tenancy.startDate):"",
                            endDate: tenancy?moment(tenancy.endDate):"",
                            deposit: tenancy?tenancy.deposit:""
                        }}
                        className='login-form'
                        name='loginForm'
                        size='large'
                        onFinish={updateTenancyFormHandler}
                        autoComplete='off'
                        />
                    }
                </Col>
            </Row>
    </div>

	);
};

export default LandlordPageUpdateTenancyContainer;