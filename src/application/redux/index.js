import { configureStore } from '@reduxjs/toolkit';
import { locationSlice } from './location/slice/allLocationSlice';
import { reviewsSlice } from './reviews/slice';
import { userSlice } from './user/slice';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		locations: locationSlice.reducer,
		reviews: reviewsSlice.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
});
