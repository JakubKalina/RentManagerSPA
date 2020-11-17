import { landlordRoomsSlice } from './landlord/rooms/rooms.slice';
import { landlordFlatsSlice } from './landlord/flats/flats.slice';
import { combineReducers } from '@reduxjs/toolkit';

import adminLogsSlice from './admin/logs/logs.slice';
import adminUsersSlice from './admin/users/users.slice';

import sessionSlice from './session/session.slice';
import usersSlice from './users/users.slice';
import { landlordTenanciesSlice } from './landlord/tenancies/tenancies.slice';
import { reviewsSlice } from './reviews/reviews.slice';

const rootReducer = combineReducers({
	admin: combineReducers({
		users: adminUsersSlice.reducer,
		logs: adminLogsSlice.reducer
	}),
	session: sessionSlice.reducer,
	reviews: reviewsSlice.reducer,
	users: usersSlice.reducer,
	landlord: combineReducers({
		flats: landlordFlatsSlice.reducer,
		rooms: landlordRoomsSlice.reducer,
		tenancies: landlordTenanciesSlice.reducer
	})
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
