import React from 'react';

import { Layout, Row, Card, Button } from 'antd';

import { default as AdminNavbar } from './containers/AdminNavbarContainer';
import { default as AdminPageUsers } from './users/AdminPageUsersContainer';
import { default as AdminPageLogs } from './logs/AdminPageLogsContainer';
import { Link } from 'react-router-dom';
import './AdminPageContainer.less';


const AdminPageContainer: React.FC<{}> = () => {

	return (
		<div className='home--container'>

				<Row align='middle' justify='center'>
				<Card title="System zarządzania najmem" className='home--container--card'>
					<Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>
						<p>
                            Panel administratora
						</p>
					</Card.Grid>
					<Card.Grid style={{width: '50%', textAlign: "center"}}>  
						<Link to='/admin/flats'>
							<Button type="primary">Mieszkania</Button>
						</Link>
					</Card.Grid>
					<Card.Grid style={{width: '50%', textAlign: "center"}}>
						<Link to='/admin/messages'>
					    	<Button type="primary">Wiadomości</Button>
						</Link>
					</Card.Grid>
				</Card>

				</Row>
		</div>
	);
};

export default AdminPageContainer;
