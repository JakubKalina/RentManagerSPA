import React, { useEffect } from "react";
import StatusType from "App/types/requestStatus";
import { Result, Row, Button, Badge, Col, Typography, Avatar, Input, Table, notification } from "antd";
import { UserOutlined, ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import LoadingScreen from "App/common/components/LoadingScreen";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { getFlats } from "App/state/landlord/flats/flats.thunk";
import { cleanUpFlatStatus } from "App/state/landlord/flats/flats.slice";
import { renderTableColumns } from "../utils/FlatTable";


const { LOADING, SUCCESS } = StatusType;


const LandlordPageGetFlatsContainer: React.FC<{}> = () => {

	const dispatch = useDispatch();

	const flats = useSelector((state: RootState) => state.landlord.flats.flats);
	const flatsStatus = useSelector((state: RootState) => state.landlord.flats.status);

	const { pageNumber, pageSize, totalNumberOfItems } = useSelector(
		(state: RootState) => state.landlord.flats.getFlatsParams
	);

	useEffect(() => {
		dispatch(getFlats(defaultPageQueryParams));

		return () => {
			dispatch(cleanUpFlatStatus())
		}
	}, [dispatch]);

	const handleTableChange = (pagination: any): any => {
		dispatch(
			getFlats({
				...defaultPageQueryParams,
				pageNumber: pagination.current || 1,
				pageSize: pagination.pageSize || 10,
				query: ''
			})
		);
	};

	const paginationConfig = {
		pageSize,
		current: pageNumber,
		total: totalNumberOfItems,
		showSizeChanger: true
	};

	return (
		<>
			{flatsStatus.deleteFlat === StatusType.SUCCESS &&
			notification.success({
				message: 'Sukces',
				description: `Pomyślnie usunięto mieszkanie`
			})}
			<Row>
				<Col span={23}>
                                                                                        {/* Zmienić */}
					<Link to='/admin/users/create'> 
						<Button icon={<PlusOutlined />}>Nowe mieszkanie</Button>
					</Link>
				</Col>
			</Row>
			<Row className='overflow-hidden'>
				<Col span={24}>
					{/* <Input
						allowClear
						onChange={(val) =>
							dispatch(
								getFlats({
									...defaultPageQueryParams,
									query: val.currentTarget.value
								})
							)
						}
					/> */}
					<Table
						pagination={paginationConfig}
						onChange={handleTableChange}
						loading={flatsStatus.getFlats === LOADING}
						columns={renderTableColumns(flats, dispatch)}
						dataSource={flats}
						rowKey='id'
					/>
				</Col>
			</Row>
		</>
	);
};

export default LandlordPageGetFlatsContainer;