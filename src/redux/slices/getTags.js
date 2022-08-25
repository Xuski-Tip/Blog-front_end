import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios.js'
export const fetchGetAllTags = createAsyncThunk('comments/fetchGetAllTags', async (id) => {
    const {data} = await axios.get(`/tags/${id}`);  
    return data
})
const initialState = {
    tags: {
        items: [],
        status: 'loading'
    }
}
const tagsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchGetAllTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loading';
        },
        [fetchGetAllTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'loaded';
        },
        [fetchGetAllTags.rejected]: (state) => {
            state.tags.items = []
            state.tags.status = 'error';
        },
    }
})
export const TagsReducer = tagsSlice.reducer
