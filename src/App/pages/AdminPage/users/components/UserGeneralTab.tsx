import { Badge, Col, Row, Tag, Typography } from 'antd';
import { GetUserResponse } from 'App/api/endpoints/admin/responses';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface UserGeneralTabProps {
	user: GetUserResponse;
}

const UserGeneralTab: React.FC<UserGeneralTabProps> = ({ user }) => {
	const { t } = useTranslation();

	if (user) {
		return (
			<>
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<Typography>
							<Typography.Text type='secondary'>{t('GetUserTabs.FirstName')}: </Typography.Text>
							<Typography.Text>{user.firstName}</Typography.Text>
						</Typography>
					</Col>
					<Col span={24}>
						<Typography>
							<Typography.Text type='secondary'>{t('GetUserTabs.LastName')}: </Typography.Text>
							<Typography.Text>{user.lastName}</Typography.Text>
						</Typography>
					</Col>
					<Col span={24}>
						<Badge
							status={user.emailConfirmed ? 'success' : 'default'}
							title={
								user.emailConfirmed
									? t('GetUserTabs.StatusConfirmed')
									: t('GetUserTabs.StatusUnConfirmed')
							}
						>
							<Typography>
								<Typography.Text type='secondary'>{t('GetUserTabs.EmailAddress')}: </Typography.Text>
								<Typography.Text>{user.email}</Typography.Text>
							</Typography>
						</Badge>
					</Col>
					<Col span={24}>
						<Badge
							status={user.phoneNumberConfirmed ? 'success' : 'default'}
							title={
								user.phoneNumberConfirmed
									? t('GetUserTabs.StatusConfirmed')
									: t('GetUserTabs.StatusUnConfirmed')
							}
						>
							<Typography>
								<Typography.Text type='secondary'>{t('GetUserTabs.PhoneNumber')}: </Typography.Text>
								<Typography.Text>
									{user.phoneNumber || t('GetUserTabs.BlankPhoneNumber')}
								</Typography.Text>
							</Typography>
						</Badge>
					</Col>
					<Col span={24}>
						<Typography>
							<Typography.Text type='secondary'>{t('GetUserTabs.UserName')}: </Typography.Text>
							<Typography.Text>{user.userName}</Typography.Text>
						</Typography>
					</Col>
					<Col span={24}>
						<Typography>
							<Typography.Text type='secondary'>{t('GetUserTabs.Roles')}: </Typography.Text>
							{user.roles.map((role, index) => {
								const generatedRoleKey = `Roles.${role}`;
								return <Tag key={index}>{t(generatedRoleKey)}</Tag>;
							})}
						</Typography>
					</Col>
				</Row>
			</>
		);
	} else {
		return <></>;
	}
};

export default UserGeneralTab;
