import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios.js'
export const fetchComments = createAsyncThunk('comments/fetchComments', async (params) => {
    const {data} = await axios.post(`/comments`, params);
    return data
})
export const fetchGetComments = createAsyncThunk('comments/fetchGetComments', async (id) => {
    const {data} = await axios.get(`/comments/${id}/`);
    return data
})
export const fetchGetAllComments = createAsyncThunk('comments/fetchGetAllComments', async () => {
    const {data} = await axios.get(`/comments`);
    return data
})
export const fetchRemove = createAsyncThunk('comments/fetchRemove', async (id) => {
    await axios.delete(`/comments/${id}`);
})
const initialState = {
    comments: {
        items: [],
        status: 'loading'
    },
}
const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        // Отправка камментариев
        [fetchComments.pending]: (state) => {
            state.comments.items = []
            state.comments.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload
            state.comments.status = 'loaded';
        },
        [fetchComments.rejected]: (state) => {
            state.comments.items = []
            state.comments.status = 'error';
        },
        // Получение по Id камментариев
        [fetchGetComments.pending]: (state) => {
            state.comments.items = []
            state.comments.status = 'loading';
        },
        [fetchGetComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload
            state.comments.status = 'loaded';
        },
        [fetchGetComments.rejected]: (state) => {
            state.comments.items = []
            state.comments.status = 'error';
        },
        // Получение всех камментариев
        [fetchGetAllComments.pending]: (state) => {
            state.comments.items = []
            state.comments.status = 'loading';
        },
        [fetchGetAllComments.fulfilled]: (state, action) => {
            state.comments.items = action.payload
            state.comments.status = 'loaded';
        },
        [fetchGetAllComments.rejected]: (state) => {
            state.comments.items = []
            state.comments.status = 'error';
        },
        // Удаление камментариев 
        [fetchRemove.pending]: (state, action) => {
            state.comments.items = state.comments.items.filter((obj) => obj._id !== action.meta.arg) 
        },
     },
})
export const selectIsComments = state => Boolean(state.comments.comments)
export const commentsReducer = commentsSlice.reducer
