import React from 'react';
import { Result, Button } from 'antd';
import { RouteComponentProps } from 'react-router';
import { useTranslation } from 'react-i18next';

interface NotFoundPageContainerProps extends RouteComponentProps {}

const NotFoundPageContainer: React.FC<NotFoundPageContainerProps> = ({ history }: NotFoundPageContainerProps) => {
	const buttonGoBackHomeOnClick = () => history.push('/');
	const {t} = useTranslation();

	return (
		<Result
			status="warning"
			title='404'
			subTitle={'Niestety, nie udało się znaleźć tej strony'}
			extra={
				<Button type='primary' onClick={buttonGoBackHomeOnClick}>
					{'Wróć do strony głównej'}
				</Button>
			}
		></Result>
	);
};

export default NotFoundPageContainer;
