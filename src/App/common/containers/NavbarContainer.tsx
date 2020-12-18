import React from 'react';
import { Menu, Tabs, Button } from 'antd';
import { Link, useLocation, RouteChildrenProps, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'App/state/root.reducer';

import './NavbarContainer.less';
import { useTranslation } from 'react-i18next';
import SubMenu from 'antd/lib/menu/SubMenu';
import { devalidateSession } from 'App/state/session/session.thunk';

const { TabPane } = Tabs;

type MouseClickEvent = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;


const NavbarContainer: React.FC<{}> = () => {


	const history = useHistory();


	const userRole = useSelector<RootState>(
		(state: RootState) => {
			let currentRole = state.session.user && state.session.user.roles
			if(currentRole && currentRole.length > 0)
			{
				 return currentRole[0];
			} else return null;
		}
	);
	
	const dispatch = useDispatch();
	
	const handleLogOutButtonClick: MouseClickEvent = () => {
		dispatch(
			devalidateSession(() => {
				history.push('/');
			})
		);
	};


	const location = useLocation();


		if(userRole === 'Landlord')
		{
			return (
				<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
					<Menu.Item key='/'>
						<Link to='/'>Home</Link>
					</Menu.Item>
					<Menu.Item key='/landlord/search'>
						<Link to='/landlord/search'>Znajdź użytkownika</Link>
					</Menu.Item>
					<Menu.Item key='/landlord/flats'>
						<Link to='/landlord/flats'>Moje mieszkania</Link>
					</Menu.Item>
					<Menu.Item key='/landlord/messages'>
						<Link to='/landlord/messages'>Wiadomości</Link>
					</Menu.Item>
					<Menu.Item key='/landlord/reports'>
						<Link to='/landlord/reports'>Aktualności</Link>
					</Menu.Item>
					<Menu.Item key='/landlord/profile'>
						<Link to='/landlord/profile'>Profil</Link>
					</Menu.Item>
					<Menu.Item>
						<Button onClick={handleLogOutButtonClick}>Wyloguj</Button>
					</Menu.Item>
				</Menu>
			);
		} else if( userRole === 'Administrator'){
			return (
				<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
					<Menu.Item key='/'>
						<Link to='/'>Home</Link>
					</Menu.Item>
					<Menu.Item key='/admin/flats'>
						<Link to='/admin/flats'>Mieszkania</Link>
					</Menu.Item>
					<Menu.Item key='/admin/landlords'>
						<Link to='/admin/landlords'>Zarządcy</Link>
					</Menu.Item>
					<Menu.Item key='/admin/tenants'>
						<Link to='/admin/tenants'>Najemcy</Link>
					</Menu.Item>
					<Menu.Item key='/admin/search'>
						<Link to='/admin/search'>Znajdź użytkownika</Link>
					</Menu.Item>
					<Menu.Item key='/admin/messages'>
						<Link to='/admin/messages'>Wiadomości</Link>
					</Menu.Item>
					<Menu.Item key='/admin/profile'>
						<Link to='/admin/profile'>Profil</Link>
					</Menu.Item>
					<Menu.Item>
						<Button onClick={handleLogOutButtonClick}>Wyloguj</Button>
					</Menu.Item>
				</Menu>
			);
		} else if( userRole === 'Tenant') {
			return (
				<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
					<Menu.Item key='/'>
						<Link to='/'>Home</Link>
					</Menu.Item>
					<Menu.Item key='/tenant/search'>
						<Link to='/tenant/search'>Znajdź użytkownika</Link>
					</Menu.Item>
					<Menu.Item key='/tenant/flats'>
						<Link to='/tenant/flats'>Moje mieszkania</Link>
					</Menu.Item>
					<Menu.Item key='/tenant/payments'>
						<Link to='/tenant/payments'>Opłaty</Link>
					</Menu.Item>
					<Menu.Item key='/tenant/messages'>
						<Link to='/tenant/messages'>Wiadomości</Link>
					</Menu.Item>
					<Menu.Item key='/tenant/reports'>
						<Link to='/tenant/reports'>Aktualności</Link>
					</Menu.Item>
					<Menu.Item key='/tenant/profile'>
						<Link to='/tenant/profile'>Profil</Link>
					</Menu.Item>
					<Menu.Item>
						<Button onClick={handleLogOutButtonClick}>Wyloguj</Button>
					</Menu.Item>
				</Menu>
			);
		} else {
					return (
			<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
				<Menu.Item key='/'>
				<Link to='/'>Strona główna</Link>
				</Menu.Item>
				<Menu.Item key='/signin'>
				<Link to='/signin'>Logowanie</Link>
				</Menu.Item>
				<Menu.Item key='/signup'>
				<Link to='/signup'>Rejestracja</Link>
				</Menu.Item>
			</Menu>
			);
		}


};

export default NavbarContainer;
