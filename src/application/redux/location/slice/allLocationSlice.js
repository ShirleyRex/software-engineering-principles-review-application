import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCollection } from '../../../firebase/services';

export const fetchAllLocations = createAsyncThunk('location/fetchAll', async () => {
	return await getCollection('locations');
});

const initialState = {
	locations: [],
	loading: 'idle'
};

export const locationSlice = createSlice({
	name: 'locations',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllLocations.fulfilled, (state, action) => {
			state.locations = action.payload;
			state.loading = 'fulfilled';
		});
	}
});
