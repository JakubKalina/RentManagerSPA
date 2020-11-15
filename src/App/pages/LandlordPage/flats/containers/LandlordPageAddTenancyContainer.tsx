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
import { getTenancies, beginTenancy } from "App/state/landlord/tenancies/tenancies.thunk";
import { renderRoomsTableColumns } from "../components/RoomsTable";
import { renderTenantsTableColumns } from "../components/TenantsTable";
import AddTenancyForm from "../components/AddTenancyForm";
import { GetFlatTenanciesResponse } from "App/api/endpoints/tenancy/responses/getFlatTenanciesResponse";


const { LOADING, SUCCESS } = StatusType;
const { Option } = Select;


interface RouteParams {
	userId: string;
}

type MouseClickEvent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;


interface LandlordPageAddTenanctContainerProps extends RouteComponentProps<RouteParams> {}


const LandlordPageAddTenancyContainer: React.FC<LandlordPageAddTenanctContainerProps> = ({ match}: LandlordPageAddTenanctContainerProps) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const userId = match.params.userId;

    const [chosenFlat, setChosenFlatQuery] = useState(null);

    const [chosenRoom, setChosenRoomQuery] = useState(null);


    
    const flats = useSelector((state: RootState) => state.landlord.flats.flats);
    const flatsStatus = useSelector((state: RootState) => state.landlord.flats.status);
    
    const rooms = useSelector((state: RootState) => state.landlord.rooms.rooms);
    const roomsStatus = useSelector((state: RootState) => state.landlord.rooms.status);

    const [addTenancyError, setAddTenancyError] = useState<string[] | boolean>(false);


    useEffect(() => {
		dispatch(getFlats(defaultPageQueryParams));

		return () => {
			dispatch(cleanUpFlatStatus())
		}
    }, [dispatch]);
    

    // Zmiana mieszkania
    const handleFlatSelectChange = (value: any) => {
        dispatch(getRooms(Number(value)));
        setChosenFlatQuery(Number(value));
    }

    
    // Zmiana pokoju
    const handleRoomSelectChange = (value: any) => {
        setChosenRoomQuery(Number(value));
    }

    // Dodanie najmu
    const addTenancyFormHandler = (value: GetFlatTenanciesResponse) => {

        let handleSuccess: () => void = () => {
			history.push('/landlord/flats');
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
			setAddTenancyError(errors);
        };
        
        if(chosenFlat == null)
        {
            setAddTenancyError(['Należy wybrać mieszkanie']);
        }

        dispatch(
			beginTenancy({
                flatId: chosenFlat,
                startDate: value.startDate,
                endDate: value.endDate,
                deposit: Number(value.deposit),
                userId: userId,
                roomId: chosenRoom
			}, handleSuccess, handleError)
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
                    <PageHeader title={'Rozpocznij najem'} />

                        {flatsStatus.getFlats === StatusType.LOADING ? null : 
                            <Select
                                showSearch
                                style={{ width: '100%', marginBottom: '24px' }}
                                placeholder="Wybierz mieszkanie"
                                optionFilterProp="children"
                                onChange={handleFlatSelectChange}

                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {flats.map((flat) => (
                                    <Option value={flat.id}>{flat.description}</Option>
                                ))}
                            </Select>
                        }

                        {roomsStatus.getRooms === StatusType.LOADING ? null : 
                            <Select
                                showSearch
                                style={{ width: '100%', marginBottom: '24px' }}
                                placeholder="Wybierz pokój"
                                optionFilterProp="children"
                                onChange={handleRoomSelectChange}

                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value={null}>{'Brak'}</Option>
                                {rooms.map((room) => (
                                    <Option value={room.id}>{room.name}</Option>
                                ))}
                            </Select>
                        }

                        <AddTenancyForm
                        className='login-form'
                        name='loginForm'
                        size='large'
                        onFinish={addTenancyFormHandler}
                        autoComplete='off'
                        />

                </Col>
            </Row>
    </div>

	);
};

export default LandlordPageAddTenancyContainer;