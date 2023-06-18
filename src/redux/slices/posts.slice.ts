import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import { IPost } from '../../interfaces/store.interface';
import { OrderType } from '../../types';


interface IState {
    isLoading: boolean,
    request: {
        status: number,
        message: string
    },
    data: {
        posts: Array<IPost>,
        postsOrder: OrderType
    }
}

const initialState: IState = {
    isLoading: false,
    request: {
        status: 200,
        message: 'Success!'
    },
    data: {
        posts: [],
        postsOrder: 'old_first'
    }
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getFirstPosts = createAsyncThunk(
    'posts/get_first_posts',
    async function (_, { rejectWithValue }) {
        try {
            const response = await axios.postForm(API_BASE_URL, {
                actionName: 'MessagesLoad'
            });
            return response.data.Messages;
        } catch (e: any) {
            if (!e.response) {
                return rejectWithValue(e.message);
            }
            rejectWithValue(e.response.data);
        }
    }
);

export const checkForNewPost = createAsyncThunk(
    'posts/check_for_new_post',
    async function ({ messageId }: { messageId: string }, { rejectWithValue }) {
        try {
            const response = await axios.postForm(API_BASE_URL, {
                actionName: 'MessagesLoad',
                messageId
            })

            return typeof response.data === 'string' ? null : response.data.Messages;
        } catch (e: any) {
            if (!e.response) {
                return rejectWithValue(e.message);
            }
            rejectWithValue(e.response.data);
        }
    }
)

let posts: Array<string> = JSON.parse(localStorage.getItem('favoritePosts') || '[]');

const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<string>) {
            for (const postIndex in state.data.posts) {
                const post: IPost = state.data.posts[postIndex];
                if (post.id + '' === action.payload) {
                    post.isFavorite = !post.isFavorite;
                    if (post.isFavorite) {
                        posts.push(action.payload);
                        localStorage.setItem('favoritePosts', JSON.stringify(posts));
                    } else {
                        posts = posts.filter(postId => postId !== action.payload);
                        localStorage.setItem('favoritePosts', JSON.stringify(posts));
                    }
                    return;
                }
            }
        },
        changePostOrder(state, action: PayloadAction<OrderType>) {
            state.data.postsOrder = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getFirstPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.posts = action.payload.map((post: IPost) => ({ ...post, isFavorite: posts.includes(post.id + '') }));
            state.request.message = 'Success!';
            state.request.status = 200
        }).addCase(getFirstPosts.rejected, (state, action) => {
            state.data.posts = [];
            state.isLoading = false;
            state.request.status = typeof action.error.code === 'string' ? +action.error.code : 500;
            state.request.message = action.error.message + '';
        }).addCase(getFirstPosts.pending, (state) => {
            state.isLoading = true;
            state.request.message = 'Loading'
        }).addCase(checkForNewPost.pending, (state) => {
            state.isLoading = true;
        }).addCase(checkForNewPost.rejected, (state, action) => {
            state.request.status = typeof action.error.code === 'string' ? +action.error.code : 500;
            state.request.message = action.error.message + '';
            state.isLoading = false;
        }).addCase(checkForNewPost.fulfilled, (state, action) => {
            if (!action.payload) return;
            if (state.data.postsOrder === 'old_first') {
                state.data.posts.push(...action.payload.map((post: IPost) => ({ ...post, id: _.uniqueId(), isFavorite: posts.includes(post.id + '') })));
            } else {
                state.data.posts.unshift(...action.payload.map((post: IPost) => ({ ...post, id: _.uniqueId(), isFavorite: posts.includes(post.id + '') })));
            }
        })
    }
})

export const { toggleFavorite, changePostOrder } = PostsSlice.actions;

export default PostsSlice.reducer