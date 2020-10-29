import { Row, Col, Typography } from 'antd';
import { GetUserResponse } from 'App/api/endpoints/admin/responses';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface UserSecurityTabProps {
	user: GetUserResponse;
}

const UserSecurityTab: React.FC<UserSecurityTabProps> = ({ user }) => {
	const { t } = useTranslation();

	if (user) {
		return (
			<>
				<Row gutter={[16, 16]}>
					{user.lockoutEnabled && (
						<Col span={24}>
							<Typography>
								<Typography.Text type='secondary'>{t('GetUserTabs.LockedUntil')}: </Typography.Text>
								<Typography.Text>{user.lockoutEnd}</Typography.Text>
							</Typography>
						</Col>
					)}
					<Col span={24}>
						<Typography>
							<Typography.Text type='secondary'>{t('GetUserTabs.AccessFailedCount')}: </Typography.Text>
							<Typography.Text>{user.accessFailedCount}</Typography.Text>
						</Typography>
					</Col>
					<Col span={24}>
						<Typography>
							<Typography.Text type='secondary'>{t('GetUserTabs.TwoFactor')}: </Typography.Text>
							<Typography.Text>
								{user.twoFactorEnabled ? t('GetUserTabs.Active') : t('GetUserTabs.Inactive')}
							</Typography.Text>
						</Typography>
					</Col>
				</Row>
			</>
		);
	} else {
		return <></>;
	}
};

export default UserSecurityTab;
