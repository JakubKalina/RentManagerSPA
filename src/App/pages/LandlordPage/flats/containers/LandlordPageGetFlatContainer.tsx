import React, { useEffect, useState, Dispatch } from "react";
import StatusType from "App/types/requestStatus";
import { Result, Row, Button, Badge, Col, Typography, Avatar, Input, Table, notification, Modal, Card, Form, PageHeader, Dropdown, Menu } from "antd";
import { UserOutlined, ArrowLeftOutlined, PlusOutlined, HomeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import LoadingScreen from "App/common/components/LoadingScreen";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { getFlats, createFlat, getFlat, deleteFlat } from "App/state/landlord/flats/flats.thunk";
import { cleanUpFlatStatus } from "App/state/landlord/flats/flats.slice";
import { renderTableColumns } from "../components/FlatTable";
import './LandlordPageGetFlatsContainer.less';
import CreateFlatForm from "../components/CreateFlatForm";
import { Store } from "antd/lib/form/interface";
import { CreateFlatRequest } from "App/api/endpoints/flat/requests/createFlatRequest";
import { getRooms, createRoom } from "App/state/landlord/rooms/rooms.thunk";
import { getTenancies } from "App/state/landlord/tenancies/tenancies.thunk";
import { renderRoomsTableColumns } from "../components/RoomsTable";
import { renderTenantsTableColumns } from "../components/TenantsTable";
import { FlatForGetLandlordFlatsResponse } from "App/api/endpoints/flat/responses/getLandlordFlatsResponse";
import AddRoomForm from "../components/AddRoomForm";
import { CreateRoomRequest } from "App/api/endpoints/room/requests/createRoomRequest";


const { LOADING, SUCCESS } = StatusType;



    // Usunięcie mieszkania
    export function handleDeleteFlatButtonClick(flatId: string, flat: FlatForGetLandlordFlatsResponse, dispatch: Dispatch<any>, history: any) {

        const { confirm } = Modal;

        return () => {
            confirm({
                title: `Czy na pewno chcesz usunąć mieszkanie ${flat?.description} ?`,
                icon: <ExclamationCircleOutlined />,
                content: 'Wykonanie tej akcji będzie nieodwracalne!',
                okText: 'Tak',
                okType: 'primary',
                cancelText: 'Nie',
                onOk() {
                    dispatch(deleteFlat(Number(flatId)));
                    history.push(`/landlord/flats`);
                }
            });
        };
   
    }; 



interface RouteParams {
	flatId: string;
}

type MouseClickEvent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;


interface LandlordPageGetFlatContainerProps extends RouteComponentProps<RouteParams> {}


const LandlordPageGetFlatContainer: React.FC<LandlordPageGetFlatContainerProps> = ({ match}: LandlordPageGetFlatContainerProps) => {

    const dispatch = useDispatch();
    const history = useHistory();

    type FinishFormType = (values: Store) => void;

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

    }, [dispatch]);
    
    // Pokoje
    useEffect(() => {
		dispatch(getRooms(Number(flatId)));
	}, [dispatch]);


    // Najemcy
    useEffect(() => {

		dispatch(getTenancies(Number(flatId)));

	}, [dispatch]);


    // Powiadomienia mieszkania
    const handleDisplayFlatReportsButtonClick: MouseClickEvent = () => {
        history.push(`/landlord/flats/${Number(flatId)}/reports`);
    };
    
    
    // Edycja mieszkania
    const handleEditFlatButtonClick: MouseClickEvent = () => {
        history.push(`/landlord/flats/${Number(flatId)}/update`);
    };


    // Dodanie nowego pokoju
    const handleAddRoomButtonClick: MouseClickEvent = () => {
        setModalAddRoomVisible(true);
    };

    // Dodanie nowego najemcy - przejście do wyszukiwarki
    const handleAddTenantButtonClick: MouseClickEvent = () => {

		history.push('/landlord/search');

    };
    
    
    const layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 8 },
    };


      

	const [modalAddRoomLoading, setModalAddRoomLoading] = useState(false);
    const [modalAddRoomVisible, setModalAddRoomVisible] = useState(false);

    const showAddRoomModal = () => {
        setModalAddRoomVisible(true);
    };
  
    const handleAddRoomOk = () => {
        setModalAddRoomLoading(true);
    };
  
    const handleAddRoomCancel = () => {
        setModalAddRoomVisible(false);
    };


    const createFlatHandler: FinishFormType = (values: CreateRoomRequest) => {

        let handleSuccess: () => void = () => {
            setModalAddRoomVisible(false);
            dispatch(
                getRooms(Number(flatId))
            );
            values = null;
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
		};

		dispatch(
			createRoom(
				{
                    flatId: Number(flatId),
                    name: values.name
                },
                handleSuccess,
                handleError
            )
        );
        
    };
    

    const menu = (
        <Menu>
          <Menu.Item>
            <Button onClick={handleDisplayFlatReportsButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Sprawdź aktualności</Button>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={handleEditFlatButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Edytuj mieszkanie</Button>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={handleDeleteFlatButtonClick(flatId, flat, dispatch, history)} type="primary" style={{width: '150px', margin: "10px"}}>Usuń mieszkanie</Button>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={handleAddRoomButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Dodaj pokój</Button>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={handleAddTenantButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Dodaj najemcę</Button>
          </Menu.Item>
        </Menu>
      );


	return (
		<>
        <Row justify='center'>
            <Col xs={22} md={22} xl={11} xxl={11}>
                {flatStatus === LOADING ? null: 
                <Card title="Informacje o mieszkaniu" style={{height: '100%'}} className='profile--container--card'>
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



					<Card.Grid style={{width: '100%', textAlign: "center"}}>

                        <Dropdown  overlay={menu} placement="bottomCenter" arrow>
                            <Button>Opcje</Button>
                        </Dropdown>

                        <Modal
                        visible={modalAddRoomVisible}
                        title="Dodaj pokój"
                        onOk={handleAddRoomOk}
                        onCancel={handleAddRoomCancel}
                        footer={[
                            <Button key="back" onClick={handleAddRoomCancel}>
                            Anuluj
                            </Button>,
                        ]}
                        >
                            <AddRoomForm
                                className='login-form'
                                name='loginForm'
                                size='large'
                                onFinish={createFlatHandler}
                                autoComplete='off'
                            />
                        </Modal>

					</Card.Grid>












					{/* <Card.Grid style={{width: '100%', textAlign: "center"}}>

                        <Button onClick={handleEditFlatButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Edytuj mieszkanie</Button>
                       
                        <Button onClick={handleDeleteFlatButtonClick(flatId, flat, dispatch, history)} type="primary" style={{width: '150px', margin: "10px"}}>Usuń mieszkanie</Button>
                      
                        <Button onClick={handleAddRoomButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Dodaj pokój</Button>
                      
                        <Button onClick={handleAddTenantButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Dodaj najemcę</Button>
     
                        <Modal
                        visible={modalAddRoomVisible}
                        title="Dodaj pokój"
                        onOk={handleAddRoomOk}
                        onCancel={handleAddRoomCancel}
                        footer={[
                            <Button key="back" onClick={handleAddRoomCancel}>
                            Anuluj
                            </Button>,
                        ]}
                        >
                            <AddRoomForm
                                className='login-form'
                                name='loginForm'
                                size='large'
                                onFinish={createFlatHandler}
                                autoComplete='off'
                            />
                        </Modal>

					</Card.Grid> */}

{/* 
					<Card.Grid style={{width: '100%', textAlign: "center"}}>


                    <Button onClick={handleAddRoomButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Dodaj pokój</Button>
                      
                      <Button onClick={handleAddTenantButtonClick} type="primary" style={{width: '150px', margin: "10px"}}>Dodaj najemcę</Button>



                      
                      <Modal
                      visible={modalAddRoomVisible}
                      title="Dodaj pokój"
                      onOk={handleAddRoomOk}
                      onCancel={handleAddRoomCancel}
                      footer={[
                          <Button key="back" onClick={handleAddRoomCancel}>
                          Anuluj
                          </Button>,
                      ]}
                      >
                          <AddRoomForm
                              className='login-form'
                              name='loginForm'
                              size='large'
                              onFinish={createFlatHandler}
                              autoComplete='off'
                          />
                      </Modal>

					</Card.Grid> */}
















				</Card>
                }
            </Col>



            <Col xs={22} md={22} xl={11} xxl={11}>


                <Card title="Dostępne pokoje" style={{height: '100%'}} className='profile--container--card'>
					<Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>
                              
                    <Table
                    loading={roomsStatus.getRooms === LOADING}
                    columns={renderRoomsTableColumns(rooms, dispatch, Number(flatId))}
                    dataSource={rooms}
                    rowKey='id'
                    />

					</Card.Grid>

				</Card>

            </Col>

        </Row>

        <Row justify='center'>
            <Col xs={22} md={22} xl={22} xxl={22}>

            <Card title="Aktualni najemcy" style={{height: '100%'}} className='profile--container--card'>
					<Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>
                              
                        <Table
                        
                        loading={tenantsStatus.getTenancies === StatusType.LOADING}
                        columns={renderTenantsTableColumns(tenants, history, Number(flatId), dispatch)}
                        dataSource={tenants}
                        rowKey='id'
                        />

					</Card.Grid>

				</Card>

            </Col>

        </Row>
		</> 

	);
};

export default LandlordPageGetFlatContainer;

