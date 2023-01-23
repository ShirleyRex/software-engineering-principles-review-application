import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, authenticateAndFetch } from '../../firebase/services';

export const loginUser = createAsyncThunk('user/login', async ({ email, password }) => {
	return await login(email, password);
});

export const fetchUserDetails = createAsyncThunk('user/get-details', async (user) => {
	return await authenticateAndFetch(user);
});

const initialState = {
	data: {},
	loading: 'idle',
	isAuthenticated: false,
	message: ''
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = {};
			state.isAuthenticated = false;
		}
	},
	extraReducers: (builders) => {
		builders
			.addCase(loginUser.fulfilled, (state, action) => {
				if (action.payload.data) {
					state.loading = 'fulfilled';
					state.data = action.payload.data;
					state.isAuthenticated = true;
				} else {
					state.loading = 'rejected';
				}
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.message = action.payload.message;
				state.loading = 'rejected';
			});

		builders.addCase(fetchUserDetails.fulfilled, (state, action) => {
			if (action.payload.data) {
				state.loading = 'fulfilled';
				state.data = action.payload.data;
				state.isAuthenticated = true;
			} else {
				state.loading = 'rejected';
			}
		});
	}
});

export const { logout } = userSlice.actions;
