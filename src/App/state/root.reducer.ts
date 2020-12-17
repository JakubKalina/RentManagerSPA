import { adminFlatsSlice } from './admin/flats/flats.slice';
import { messagesSlice } from './messages/messages.slice';
import { tenantFlatsSlice } from './tenant/flats/flats.slice';
import { tenantPaymentsSlice } from './tenant/payments/payments.slice';
import { landlordRoomsSlice } from './landlord/rooms/rooms.slice';
import { landlordFlatsSlice } from './landlord/flats/flats.slice';
import { combineReducers } from '@reduxjs/toolkit';

import adminLogsSlice from './admin/logs/logs.slice';
import adminUsersSlice from './admin/users/users.slice';

import sessionSlice from './session/session.slice';
import usersSlice from './users/users.slice';
import { landlordTenanciesSlice } from './landlord/tenancies/tenancies.slice';
import { reviewsSlice } from './reviews/reviews.slice';
import { landlordReportsSlice } from './landlord/reports/reports.slice';
import { landlordPaymentsSlice } from './landlord/payments/payments.slice';

const rootReducer = combineReducers({
	admin: combineReducers({
		users: adminUsersSlice.reducer,
		logs: adminLogsSlice.reducer,
		flats: adminFlatsSlice.reducer
	}),
	session: sessionSlice.reducer,
	reviews: reviewsSlice.reducer,
	messages: messagesSlice.reducer,
	users: usersSlice.reducer,
	tenant: combineReducers({
		payments: tenantPaymentsSlice.reducer,
		flats: tenantFlatsSlice.reducer
	}),
	landlord: combineReducers({
		flats: landlordFlatsSlice.reducer,
		rooms: landlordRoomsSlice.reducer,
		tenancies: landlordTenanciesSlice.reducer,
		reports: landlordReportsSlice.reducer,
		payments: landlordPaymentsSlice.reducer
	})
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
