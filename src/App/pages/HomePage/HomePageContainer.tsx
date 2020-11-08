import React from 'react';
import { useSelector } from 'react-redux';

import { Button, Card, Row, Col, Space, Layout, PageHeader, Menu } from 'antd';
import { RootState } from 'App/state/root.reducer';
import LandlordPageContainer from '../LandlordPage/LandlordPageContainer';
import AdminPageContainer from '../AdminPage/AdminPageContainer';
import TenantPageContainer from '../TenantPage/TenantPageContainer';
import './HomePageContainer.less';
import Meta from 'antd/lib/card/Meta';
import { Link } from 'react-router-dom';
  

const HomePageContainer: React.FC<{}> = () => {
	type MouseClickEvent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;

	const state = useSelector((state: RootState) => state);


	const userRole = useSelector<RootState>(
		(state: RootState) => {
			let currentRole = state.session.user && state.session.user.roles
			if(currentRole && currentRole.length > 0)
			{
				 return currentRole[0];
			} else return null;
		}
	);

	const logState: MouseClickEvent = () => {
		console.log(state);
	};

	const getAllCokies: MouseClickEvent = () => {
		console.log(document.cookie.split(';'));
	};


	// return (
	// 	<div>
	// 		<h1>Strona główna</h1>
	// 		<Button onClick={logState}>Log Redux State</Button>
	// 		<Button onClick={getAllCokies}>Log Document Cookies</Button>
	// 	</div>
	// );

	if(userRole === 'Landlord')
	{
		return (
			<LandlordPageContainer/>
		);
	} else if( userRole === 'Administrator'){
		return (
			<AdminPageContainer/>
		);
	} else if( userRole === 'Tenant') {
		return (
			<TenantPageContainer/>
		);
	} else {
		return(
		<div className='home--container'>

				<Row align='middle' justify='center'>
				<Card title="System zarządzania najmem" className='home--container--card'>
					<Card.Grid hoverable={false} style={{width: '100%', textAlign: "center"}}>
						<p>
							Dzięki nam wynajem mieszkania staje się o wiele protszy i przyjemniejszy.
							<br></br>
							<br></br> Przekonaj się sam.
						</p>
					</Card.Grid>
					<Card.Grid style={{width: '50%', textAlign: "center"}}>  
						<Link to='/signin'>
							<Button type="primary">Logowanie</Button>
						</Link>
					</Card.Grid>
					<Card.Grid style={{width: '50%', textAlign: "center"}}>
						<Link to='/signup'>
					    	<Button>Stwórz konto</Button>
						</Link>
					</Card.Grid>
				</Card>

				</Row>
		</div>
		);

		
	}
};

export default HomePageContainer;
