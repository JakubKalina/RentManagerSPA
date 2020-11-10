import { ChangePasswordRequest } from './../../api/endpoints/account/requests/changePasswordRequest.d';
import {
	authenticationStart,
	authenticationSuccess,
	getUserDetailsStart,
	getUserDetailsSuccess,
	getUserDetailsFailure,
	authenticationFailure,
	devalidateSessionStart,
	devalidateSessionSuccess,
	devalidateSessionFailure,
	cleanUpSessionStatusStart,
	registerUserStart,
	registerUserSuccess,
	registerUserFailure,
	updateUserDetailsStart,
	updateUserDetailsSuccess,
	updateUserDetailsFailure,
	changePasswordStart,
	changePasswordSuccess,
	changePasswordFailure
} from './session.slice';
import { LoginRequest, RegisterRequest } from 'App/api/endpoints/auth/requests';
import agent from 'App/api/agent/agent';
import { LoginResponse } from 'App/api/endpoints/auth/responses';
import { GetAccountDetailsResponse } from 'App/api/endpoints/account/responses';
import { AppThunk } from '../store';
import { UpdateProfileRequest } from 'App/api/endpoints/account/requests';

export const authenticateUser = (
	payload?: LoginRequest,
	onSuccess?: () => void,
	onError?: (error: string[]) => void
): AppThunk => async (dispatch) => {
	dispatch(authenticationStart());
	agent.Auth.login(payload)
		.then((response: LoginResponse) => {
			dispatch(authenticationSuccess(response));
			dispatch(getUserDetailsStart());
			agent.Account.getAccountDetails()
				.then((accountDetailsResponse: GetAccountDetailsResponse) => {
					dispatch(getUserDetailsSuccess(accountDetailsResponse));
					onSuccess();
				})
				.catch((error: any) => {
					dispatch(getUserDetailsFailure());
				});
		})
		.catch(() => {
			const err = ['Wprowadzono niepoprawne dane'];
			onError(err);
			dispatch(authenticationFailure(err));
		});
};

export const devalidateSession = (onSuccess?: () => void): AppThunk => async (dispatch) => {
	dispatch(devalidateSessionStart());

	try {
		setTimeout(() => {
			dispatch(devalidateSessionSuccess());
			onSuccess();
		}, 200);
	} catch (error) {
		dispatch(devalidateSessionFailure(error));
	}
};


export const registerUser = (userToRegister: RegisterRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
	dispatch(registerUserStart());
	agent.Auth.register(userToRegister)
		.then((response) => {
			dispatch(registerUserSuccess(response));
			onSuccess();
		})
		.catch((error) => 
		{			
			const err = ['Wprowadzono niepoprawne dane'];
			onError(err);
			dispatch(registerUserFailure(error));

		});
};


export const updateUserDetails = (userToUpdate: UpdateProfileRequest, onSuccess?: () => void, onError?: (error: string[]) => void):AppThunk => async (dispatch) => {
	dispatch(updateUserDetailsStart());
	agent.Account.updateProfile(userToUpdate)
		.then((response) => {
			dispatch(updateUserDetailsSuccess(response));
			onSuccess();
		})
		.catch((error) => {
			const err = ['Wprowadzono niepoprawne dane'];
			onError(err);
			dispatch(updateUserDetailsFailure(error));
		})
};



export const changePassword = (passwordToChange: ChangePasswordRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
	dispatch(changePasswordStart());
	agent.Account.changePassword(passwordToChange)
		.then(() => {
			dispatch(changePasswordSuccess());
			onSuccess();
		})
		.catch((error) => {
			const err = ['Wprowadzono niepoprawne dane'];
			onError(err);
			dispatch(changePasswordFailure(error));
		})
};


export const cleanUpSessionStatus = (): AppThunk => async (dispatch) => {
	dispatch(cleanUpSessionStatusStart());
};
