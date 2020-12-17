import React, { useEffect, useState } from "react";
import StatusType from "App/types/requestStatus";
import { Result, Row, Button, Badge, Col, Typography, Avatar, Input, Table, notification, Modal, Alert, Select, PageHeader } from "antd";
import { UserOutlined, ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import LoadingScreen from "App/common/components/LoadingScreen";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { getFlats, createFlat } from "App/state/landlord/flats/flats.thunk";
import { cleanUpFlatStatus } from "App/state/landlord/flats/flats.slice";
import { renderTableColumns } from "../components/FlatTable";
import './LandlordPageGetFlatsContainer.less';
import CreateFlatForm from "../components/CreateFlatForm";
import { Store } from "antd/lib/form/interface";
import { CreateFlatRequest } from "App/api/endpoints/flat/requests/createFlatRequest";
import { getFlatReports, createLandlordReport } from "App/state/landlord/reports/reports.thunk";
import { renderFlatReportsTableColumns } from "../components/FlatReportsTable";
import CreateLandlordReportForm from "../components/CreateLandlordReportForm";
import { CreateLandlordReportRequest } from "App/api/endpoints/report/requests/createlLandlordReportRequest";
import { getFlatPayments, createPayment } from "App/state/landlord/payments/payments.thunk";
import { createPaymentRequest } from "App/api/endpoints/payment/requests/createPaymentRequest";
import { renderFlatPaymentsTableColumns } from "../components/FlatPaymentsTable";
import { getTenancies } from "App/state/landlord/tenancies/tenancies.thunk";
import CreatePaymentForm from "../components/CreatePaymentForm";


const { LOADING, SUCCESS } = StatusType;
const { Option } = Select;


interface RouteParams {
	flatId: string;
}

interface LandlordPageCreateFlatPaymentContainerProps extends RouteComponentProps<RouteParams> {}


const LandlordPageCreateFlatPaymentContainer: React.FC<LandlordPageCreateFlatPaymentContainerProps> = ({match}: LandlordPageCreateFlatPaymentContainerProps) => {

	const dispatch = useDispatch();
	const history = useHistory();
    
    const flatId = match.params.flatId;

    type FinishFormType = (values: Store) => void;
    
    const tenants = useSelector((state: RootState) => state.landlord.tenancies.tenancies);
    const tenantsStatus = useSelector((state: RootState) => state.landlord.tenancies.status);

    const [createPaymentError, setCreatePaymentError] = useState<string[] | boolean>(false);

    const [chosenTenancy, setChosenTenancyQuery] = useState(null);

    // Najemcy
    useEffect(() => {

		dispatch(getTenancies(Number(flatId)));

	}, [dispatch]);


        // Zmiana najemcy
        const handleTenantSelectChange = (value: any) => {
            setChosenTenancyQuery(Number(value));
        }
    

        // Dodanie płatności
        const createPaymentFormHandler = (value: createPaymentRequest) => {
    
            let handleSuccess: () => void = () => {
                history.push(`/landlord/payments/${flatId}`);
            };
    
            let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
                setCreatePaymentError(errors);
            };
            
            if(chosenTenancy == null)
            {
                setCreatePaymentError(['Należy wybrać najemce']);
            }

                let chosenTenancyObject = tenants.find(t => t.id == chosenTenancy);
            
            dispatch(
                createPayment({
                    title: value.title,
                    description: value.description,
                    amount: Number(value.amount),
                    dueDate: value.dueDate,
                    isPaid: false,
                    recipientAccountNumber: value.recipientAccountNumber,
                    flatId: Number(flatId),
                    roomId: chosenTenancyObject.room.id,
                    userId: chosenTenancyObject.user.id
                }, handleSuccess, handleError)
            );
    
        }

	return (
        <div className='add-tenancy--container'>
            <Row align='middle' justify='center'>
                <Col xs={22} md={14} xl={10} xxl={8}>
                    <br />
                    {createPaymentError && (
                        <Alert
                            message='Błąd'
                            type='error'
                            showIcon
                            closable
                            description={createPaymentError}
                            className='w-100'
                        />
                    )}
                    <PageHeader title={'Dodaj nową płatność'} />

                        {tenantsStatus.getTenancies === StatusType.LOADING ? null : 
                            <Select
                                showSearch
                                style={{ width: '100%', marginBottom: '24px' }}
                                placeholder="Wybierz najemce"
                                optionFilterProp="children"
                                onChange={handleTenantSelectChange}
                            >
                                {tenants.map((tenant) => (
                                    <Option value={tenant.id}>{tenant.user.firstName} {tenant.user.lastName}</Option>
                                ))}
                            </Select>
                        }

                        <CreatePaymentForm
                        className='create-payment-form'
                        name='loginForm'
                        size='large'
                        onFinish={createPaymentFormHandler}
                        autoComplete='off'
                        />

                </Col>
            </Row>
    </div>
	);
};

export default LandlordPageCreateFlatPaymentContainer;