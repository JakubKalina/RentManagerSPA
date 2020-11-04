import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'App/state/root.reducer';

import './NavbarContainer.less';
import { useTranslation } from 'react-i18next';
import { stat } from 'fs';

const NavbarContainer: React.FC<{}> = () => {
	// const userIsLoggedIn = useSelector<RootState>(
	// 	(state: RootState) => !!(state.session.info && state.session.info.token && state.session.user.roles)
	// );

	const userIsLoggedIn = useSelector<RootState>(
		(state: RootState) => !!(state.session.info && state.session.info.token)
	);

	const userRoles = useSelector(
		(state: RootState) => {
			let currentRole = state.session.user && state.session.user.roles
			if(currentRole && currentRole.length > 0)
			{
				 return currentRole[0];
			} else return null;

		}
	);

	// const [currentRole] = useSelector(
	// 	(state: RootState) => state.session.user.roles
	// );
	

	const {t} = useTranslation();

	const location = useLocation();
	if (userIsLoggedIn) {
		return (
			<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
				<Menu.Item key='/auth'>
		<Link to='/auth'>Auth(wylogowywanie) {userRoles}</Link>
				</Menu.Item>
				<Menu.Item key='/user'>
					<Link to='/user'>UserAuth(wylogowywanie)</Link>
				</Menu.Item>
				<Menu.Item key='/admin/users'>
					<Link to='/admin/users'>{t('NavbarContainer.Admin')}</Link>
				</Menu.Item>
			</Menu>
		);
	} else {
		return (
			<Menu mode='horizontal' defaultSelectedKeys={[location.pathname]} className='menu-padding'>
				<Menu.Item key='/'>
				<Link to='/'>{t('NavbarContainer.Home')}</Link>
				</Menu.Item>
				<Menu.Item key='/signin'>
				<Link to='/signin'>{t('NavbarContainer.SignIn')}</Link>
				</Menu.Item>
			</Menu>
		);
	}
};

export default NavbarContainer;
