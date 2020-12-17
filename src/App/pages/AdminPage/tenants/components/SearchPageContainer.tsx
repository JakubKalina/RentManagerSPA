import React, { useState } from "react";
import { RootState } from "App/state/root.reducer";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import LoadingScreen from "App/common/components/LoadingScreen";
import { Row, Col, PageHeader, Alert, Table } from "antd";
import StatusType from 'App/types/requestStatus';
import './SearchPageContainer.less';
import { Store } from "antd/lib/form/interface";
import { GetUsersRequest } from "App/api/endpoints/account/requests/getUsersRequest";
import { getUsers } from "App/state/users/users.thunk";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import SearchUsersForm from "App/pages/SearchPage/components/SearchUsersForm";
import { renderAdminTableColumnsForAdmin } from "../../landlords/utils/LandlordsTableForAdmin";


const { LOADING, SUCCESS } = StatusType;


const SearchPageContainer: React.FC<{}> = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    type FinishFormType = (values: Store) => void;

    const [searchError, setSearchError] = useState<string[] | boolean>(false);
    const [searchQuery, setSearchQuery] = useState('');
    const status = useSelector((state: RootState) => state.session.status.authentication);

    const usersStatus = useSelector((state: RootState) => state.users.status);

    const users = useSelector((state: RootState) => state.users.users);

    const { pageNumber, pageSize, totalNumberOfItems } = useSelector(
		(state: RootState) => state.users.getUsersParams
	);

    const userRole = useSelector<RootState>(
		(state: RootState) => {
			let currentRole = state.session.user && state.session.user.roles
			if(currentRole && currentRole.length > 0)
			{
				 return currentRole[0];
			} else return null;
		}
    );

    
    const searchUsersHandler: FinishFormType = (values: GetUsersRequest) => {

        setSearchError(false);
        
        setSearchQuery(values.query);

		dispatch(
			getUsers(values)
        ); 
	};
    
    const paginationConfig = {
		pageSize,
		current: pageNumber,
		total: totalNumberOfItems,
		showSizeChanger: true
    };
    
    const handleTableChange = (pagination: any): any => {

		dispatch(
			getUsers({
				...defaultPageQueryParams,
				pageNumber: pagination.current || 1,
				pageSize: pagination.pageSize || 10,
				query: searchQuery
			})
        );
	};


    return (
        <div>
            <div className='search--container'>
			{status === StatusType.LOADING ?
				<LoadingScreen container='screen' />
				:
				<Row align='middle' justify='center'>
					<Col xs={22} md={14} xl={10} xxl={8}>
						<br />
						{searchError && (
							<Alert
								message='Error'
								type='error'
								showIcon
								closable
								description={searchError}
								className='w-100'
							/>
						)}
						<PageHeader title={'Znajdź zarządcę'} />

						<SearchUsersForm
							className='search-users-form'
							name='searchUsersForm'
							size='large'
							onFinish={searchUsersHandler}
							autoComplete='off'
						/>
					</Col>
				</Row>
			}
		    </div>
            <div>

                {(userRole === 'Administrator') && (searchQuery != '') ? 
                    <Table
                    pagination={paginationConfig}
                    onChange={handleTableChange}
                    loading={usersStatus.getUsers === LOADING}
                    columns={renderAdminTableColumnsForAdmin(users, dispatch)}
                    dataSource={users}
                    rowKey='id'
                    />:
                    null
                }

            </div>
        </div>

    );

};

export default SearchPageContainer;