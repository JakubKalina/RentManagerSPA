import { AxiosError } from 'axios';
import { notification } from 'antd';
import { DetailedError } from './interfaces/detailedError';

export const errorHandler = (error: AxiosError) => {
	const { status } = error.response || {};

	switch (status) {
		case 400:
			handleBadRequest(error);
			break;
		case 401:
			handleUnauthorized(error);
			break;
		case 403:
			handleForbidden(error);
			break;
		case 404:
			handleNotFound(error);
			break;
		case 500:
			handleInternalServerError(error);
			break;
		default:
			break;
	}

	throw error.response;
};
function handleBadRequest(error: AxiosError<any>) {
	const { data } = error.response || {};

	if(typeof data === "string") {
		notification['error']({
			message: 'Błąd',
			description: `Wystąpił błąd`
		});
	} else if (data.errors) {
		let mainErrorObject = data.errors;
		if (mainErrorObject.detailedErrors) {
			let detailedErrors = mainErrorObject.detailedErrors as DetailedError[];
			detailedErrors.forEach((detailedError) => {
				notification['error']({
					message: 'Błąd',
					description: detailedError.description
				});
			});
		}

		if (mainErrorObject.commonErrors) {
			console.log(mainErrorObject.commonErrors);
		}
	} else if (data) {
		Object.keys(data).forEach((key) => {
			let detailedErrorsForCurrentKey = data[key] as DetailedError[];
			detailedErrorsForCurrentKey.forEach((detailedErrorsForCurrentKey) => {
				notification['error']({
					message: 'Błąd',
					description: `${key}: ${detailedErrorsForCurrentKey.description}`
				});
			});
		});
	}
}

function handleInternalServerError(error: AxiosError<any>) {
	notification['error']({
		message: 'Błąd',
		description: 'Wystąpił błąd po stronie serwera. Spróbuj ponownie'
	});
}

function handleUnauthorized(error: AxiosError<any>) {

	notification['error']({
		message: 'Błąd',
		description: 'Nie jesteś autoryzowany. Zaloguj się ponownie'
	});

}

function handleForbidden(error: AxiosError<any>) {
	notification['error']({
		message: 'Błąd',
		description: 'Nie masz dostępu do tego zasobu'
	});
}

function handleNotFound(error: AxiosError<any>) {
	notification['error']({
		message: 'Błąd',
		description: 'Nie znaleziono zasobu'
	});
}
