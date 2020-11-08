import { RegisterResponse } from './../../api/endpoints/auth/responses/registerResponse.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sessionInitialState, SessionState } from './session.state';
import { GetAccountDetailsResponse } from 'App/api/endpoints/account/responses/getAccountDetailsResponse';
import { LoginResponse } from 'App/api/endpoints/auth/responses';
import { StatusType } from 'App/types/requestStatus';

const { FAILED, SUCCESS, LOADING } = StatusType;

const sessionSlice = createSlice({
	name: 'session',
	initialState: sessionInitialState,
	reducers: {


		
		registerUserStart: (state: SessionState) => {
			state.status.authentication = LOADING;
		},
		registerUserSuccess: (state: SessionState, action: PayloadAction<RegisterResponse>) => {
			state.status.authentication = SUCCESS;
			state.info = action.payload;

			localStorage.setItem('token', action.payload.token);
		},
		registerUserFailure: (state: SessionState, action: PayloadAction<string[]> ) => {
			state.status.authentication = FAILED;
		},





		authenticationStart: (state: SessionState) => {
			state.status.authentication = LOADING;
		},
		authenticationSuccess: (state: SessionState, action: PayloadAction<LoginResponse>) => {
			// TODO: implementacja refresh tokena na HttpOnly
			// setCookie(REFRESH_TOKEN_COOKIE_NAME, action.payload.refresh_token, 40);
			state.status.authentication = SUCCESS;
			state.info = action.payload;

			// TODO usunac token z local Storage
			localStorage.setItem('token', action.payload.token);
		},
		authenticationFailure: (state: SessionState, action: PayloadAction<string[]>) => {
			state.status.authentication = FAILED;
		},

		getUserDetailsStart: (state: SessionState) => {
			state.status.getUserDetails = LOADING;
		},
		getUserDetailsSuccess: (state: SessionState, action: PayloadAction<GetAccountDetailsResponse>) => {
			state.status.getUserDetails = SUCCESS;
			state.user = action.payload;
			state.error = null;
			console.log(action);
		},
		getUserDetailsFailure: (state: SessionState, action: PayloadAction<string[]>) => {
			state.status.getUserDetails = FAILED;
			state.error = action.payload;
		},
		devalidateSessionStart: (state: SessionState) => {
			state.status.devalidateSession = LOADING;
		},
		devalidateSessionFailure: (state: SessionState, action: PayloadAction<any>) => {
			state.status.devalidateSession = FAILED;
			state.error = action.payload;
		},
		devalidateSessionSuccess: (state: SessionState) => {
			state.status.devalidateSession = SUCCESS;
			state.user = null;
			state.error = null;
			state.info = null;

			// TODO usunac token z local Storage
			localStorage.removeItem('token');
		},


		cleanUpSessionStatusStart: (state: SessionState) => {
			state.status = sessionInitialState.status;
			state.error = sessionInitialState.error;
		}
	}
});

export default sessionSlice;

export const {
	registerUserStart,
	registerUserSuccess,
	registerUserFailure,
	authenticationStart,
	authenticationSuccess,
	authenticationFailure,
	getUserDetailsStart,
	getUserDetailsFailure,
	getUserDetailsSuccess,
	devalidateSessionFailure,
	devalidateSessionStart,
	devalidateSessionSuccess,

	cleanUpSessionStatusStart
} = sessionSlice.actions;
