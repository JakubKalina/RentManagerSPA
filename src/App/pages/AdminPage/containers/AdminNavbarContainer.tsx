import React from 'react';

import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const AdminNavbarContainer: React.FC<{}> = () => {
	const { t } = useTranslation();

	const usersSubMenu = (
		<SubMenu
			key='sub1'
			title={
				<span>
					<UserOutlined />
					<span>{t('AdminNavbarContainer.Users')}</span>
				</span>
			}
		>
			<Menu.Item key='1'>
				<Link to='/admin/users'>{t('AdminNavbarContainer.UserList')}</Link>
			</Menu.Item>
			<Menu.Item key='2'>
				<Link to='/admin/users/create'>{t('AdminNavbarContainer.AddUser')}</Link>
			</Menu.Item>
		</SubMenu>
	);

	const logsSubMenu = (
		<SubMenu key='sub2' icon={<FileTextOutlined />} title={t('AdminNavbarContainer.Logs')}>
			<Menu.Item key='3'>
				<Link to='/admin/logs'>{t('AdminNavbarContainer.LogList')}</Link>
			</Menu.Item>
		</SubMenu>
	);

	return (
		<Menu className='sidebar' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline'>
			{usersSubMenu}
			{logsSubMenu}
		</Menu>
	);
};

export default AdminNavbarContainer;
