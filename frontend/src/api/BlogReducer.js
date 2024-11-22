import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
export const GetBlog = createAsyncThunk(
    'GetBlog',
    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/blog")
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const GetBlogById = createAsyncThunk(
    'GetBlogById',
    async ({ id }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/blog/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)




const blogSlice = createSlice({
    name: "Blog",
    initialState: { blogs: [], blog: {} },
    extraReducers: {
        [GetBlog.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.blogs = payload.blogs
            } else {
                alert(payload.message)
            }
        },
        [GetBlogById.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.blog = payload.blog
            } else {
                alert(payload.message)
            }
        },

    }
}
)
export default blogSlice.reducer