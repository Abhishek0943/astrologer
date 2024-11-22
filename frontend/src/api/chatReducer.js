import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
export const FetchChat = createAsyncThunk(
    'fetchChat',
    async ({ _id }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/chat?myId=${_id}`)
            return response.data
        } catch (err) {
            console.log(err.response.data)
            return err.response.data
        }

    }
)
export const FetchMessage = createAsyncThunk(
    'FetchMessage',
    async ({ id }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/message/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)

export const StopChat = createAsyncThunk(
    'StopChat',
    async (body) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/chat`, body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const SessionReview = createAsyncThunk(
    'SessionReview',
    async (body) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/session/review`, body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)




const ChatSlice = createSlice({
    name: "Chat",
    initialState: { chats: [], chat: {}, messages: [], session: [] },
    extraReducers: {
        [FetchChat.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                state.chats = payload.chats
            }
        },
        //     [CreateChat.fulfilled]: (state, { payload }) => {
        //         if (payload.success) {
        //             state.chat = payload.chat
        //             // alert("on create a new chat redirect on chat ")
        //             // alert("call from only user profile")
        //         }
        //     },
        [FetchMessage.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                console.log(payload.messages)
                state.messages = payload.messages
            }
        },

        //     [SendMessage.fulfilled]: (state, { payload }) => {
        //         if (payload.success) {
        //             state.allMessages = [...state.allMessages, payload.message]
        //         }
        //     },
        //     [getSession.fulfilled]: (state, { payload }) => {
        //         if (payload.success) {
        //             state.session = payload.sessions
        //         }
        //     },



    }
}
)
export default ChatSlice.reducer