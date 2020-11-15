import React, { useEffect, useState } from "react";
import StatusType from "App/types/requestStatus";
import { Result, Row, Button, Badge, Col, Typography, Avatar, Input, Table, notification, Modal, Card, Form } from "antd";
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
import { getTenancies } from "App/state/landlord/tenancies/tenancies.thunk";
import { renderRoomsTableColumns } from "../components/RoomsTable";
import { renderTenantsTableColumns } from "../components/TenantsTable";


const { LOADING, SUCCESS } = StatusType;

interface RouteParams {
	flatId: string;
}

type MouseClickEvent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;


interface LandlordPageGetFlatContainerProps extends RouteComponentProps<RouteParams> {}


const LandlordPageGetFlatContainer: React.FC<LandlordPageGetFlatContainerProps> = ({ match}: LandlordPageGetFlatContainerProps) => {

    const dispatch = useDispatch();
    const history = useHistory();


	const flatId = match.params.flatId;

    
    const flat = useSelector((state: RootState) => state.landlord.flats.selectedFlat);
    const flatStatus = useSelector((state: RootState) => state.landlord.flats.status.getFlat);

    const rooms = useSelector((state: RootState) => state.landlord.rooms.rooms);
    const roomsStatus = useSelector((state: RootState) => state.landlord.rooms.status);

    const tenants = useSelector((state: RootState) => state.landlord.tenancies.tenancies);
    const tenantsStatus = useSelector((state: RootState) => state.landlord.tenancies.status);


    // Mieszkania
    useEffect(() => {
		
		let handleSuccess: () => void = () => {
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
		};

                dispatch(getFlat(Number(flatId), handleSuccess, handleError));
                
                // dispatch(getRooms(Number(flatId)));

                // dispatch(getTenancies(Number(flatId)));



    }, [dispatch]);
    
    // Pokoje
    useEffect(() => {
		dispatch(getRooms(Number(flatId)));
	}, [dispatch]);


    // Najemcy
    useEffect(() => {

		dispatch(getTenancies(Number(flatId)));

	}, [dispatch]);


    // Edycja mieszkania
    const handleEditFlatButtonClick: MouseClickEvent = () => {

    };

    // Usunięcie mieszkania
    const handleDeleteFlatButtonClick: MouseClickEvent = () => {

    }; 

    // Dodanie nowego pokoju
    const handleAddRoomButtonClick: MouseClickEvent = () => {

    };

    // Dodanie nowego najemcy - przejście do wyszukiwarki
    const handleAddTenantButtonClick: MouseClickEvent = () => {

		history.push('/landlord/search');

    };
    
    
    

    const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 8 },
      };


	return (
		<>
        <Row justify='center'>
            <Col xs={22} md={22} xl={11} xxl={11}>
            <Card title="Informacje o mieszkaniu" className='profile--container--card'>
					<Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>
                        
                        <Row align='middle' justify='center'>

                        
                        <Col  xs={20} md={3} xl={3} xxl={3}>
                        <Avatar size={64} icon={<HomeOutlined />} />
                        </Col>

                        <Col xs={20} md={0} xl={0} xxl={0}>
                            <br></br>
                        </Col>

                        <Col  xs={22} md={18} xl={18} xxl={18}>

                            <Form {...layout}>

                                <Form.Item
                                    label="Nazwa"
                                >
                                    <Input disabled={true} style={{cursor: "pointer"}} defaultValue={flat?flat.description:""} />
                                </Form.Item>

                                <Form.Item
                                    label="Adres">
                                    <Input disabled={true} style={{cursor: "pointer"}} defaultValue={flat?flat.address.homeAddress:""} />
                                </Form.Item>

                                <Form.Item
                                    label="Miasto"
                                >
                                    <Input disabled={true} style={{cursor: "pointer"}} defaultValue={flat?flat.address.city:""} />
                                </Form.Item>

                                <Form.Item
                                    label="Kod pocztowy"
                                >
                                    <Input disabled={true} style={{cursor: "pointer"}} defaultValue={flat?flat.address.postalCode:""} />
                                </Form.Item>

                                </Form>
                        </Col>

                        </Row>


					</Card.Grid>

                    <Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>

					</Card.Grid>

					<Card.Grid style={{width: '100%', textAlign: "center"}}>

                        <Button onClick={handleEditFlatButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Edytuj mieszkanie</Button>
                       
                        <Button onClick={handleDeleteFlatButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Usuń mieszkanie</Button>
                      
                        <Button onClick={handleAddRoomButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Dodaj pokój</Button>
                      
                        <Button onClick={handleAddTenantButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Dodaj najemcę</Button>


					</Card.Grid>

				</Card>
            </Col>

            <Col xs={22} md={22} xl={11} xxl={11}>
            <Table
                    loading={roomsStatus.getRooms === LOADING}
                    columns={renderRoomsTableColumns(rooms, dispatch)}
                    dataSource={rooms}
                    rowKey='id'
                />
            </Col>

        </Row>

        <Row justify='center'>
            <Col xs={22} md={22} xl={22} xxl={22}>

                <Table
                    loading={tenantsStatus.getTenancies === StatusType.LOADING}
                    columns={renderTenantsTableColumns(tenants, dispatch)}
                    dataSource={tenants}
                    rowKey='id'
                />

            </Col>

        </Row>


        {/* {
            flatStatus === StatusType.LOADING ? <></>:
        <p>Wczytano mieszkanie {flat?flat.description:""}</p>
        } */}

        
            {/* <Row className='overflow-hidden'>
            <Col span={24}>
                <Table
                    loading={roomsStatus.getRooms === LOADING}
                    columns={renderRoomsTableColumns(rooms, dispatch)}
                    dataSource={rooms}
                    rowKey='id'
                />
            </Col>
            </Row>
         */}

        
            {/* <Row className='overflow-hidden'>
            <Col span={24}>
                <Table
                    loading={tenantsStatus.getTenancies === StatusType.LOADING}
                    columns={renderTenantsTableColumns(tenants, dispatch)}
                    dataSource={tenants}
                    rowKey='id'
                />
            </Col>
            </Row>
         */}

		</> 

	);
};

export default LandlordPageGetFlatContainer;