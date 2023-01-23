import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNewReview, deleteReview, getCollection, updateDocInfo } from '../../firebase/services';

export const addReview = createAsyncThunk('reviews/add', async (data) => {
	return await addNewReview(data);
});

export const fetchAllReviews = createAsyncThunk('reviews/all', async () => {
	return await getCollection('reviews');
});

export const deleteSingleReview = createAsyncThunk('reviews/delete', async (id) => {
	return await deleteReview('reviews', id);
});

export const updateSingleReviewField = createAsyncThunk('reviews/update', async (id) => {
	return await updateDocInfo('reviews', { id, validity: 'accepted' });
});

const initialState = {
	reviews: [],
	loading: 'idle'
};

export const reviewsSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllReviews.fulfilled, (state, action) => {
			state.reviews = [...action.payload];
			state.loading = 'fulfilled';
		});

		builder.addCase(addReview.fulfilled, (state, action) => {
			if (action.payload) {
				state.reviews = [...state.reviews, action.payload];
				state.loading = 'fulfilled';
			}

			state.loading = 'rejected';
		});

		builder.addCase(updateSingleReviewField.fulfilled, (state, action) => {
			if (action.payload) {
				const id = action.payload.id;
				delete action.payload.id;

				const newReviews = state.reviews.map((item) => {
					console.log(id);

					if (item.id === id) {
						console.log(id);
						return Object.assign(item, action.payload);
					}

					return item;
				});

				state.reviews = newReviews;
				state.loading = 'fulfilled';
			}

			state.loading = 'rejected';
		});

		builder.addCase(deleteSingleReview.fulfilled, (state, action) => {
			if (action.payload) {
				state.reviews = state.reviews.filter((item) => item.id !== action.payload.id);

				state.loading = 'fulfilled';
			}

			state.loading = 'rejected';
		});
	}
});
