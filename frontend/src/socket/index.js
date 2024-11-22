
import { createSlice } from "@reduxjs/toolkit"
import io from "socket.io-client"
const ENDPOINT = "http://localhost:8000"

const SocketReducer = createSlice({
    name: "socket",
    initialState: { socketData: null, },
    reducers: {
        Initialize: (state, { payload }) => {
            state.socketData = io(ENDPOINT);
            state.socketData?.emit("setup", payload);
        },
        OnLoginEmit: (state, { payload }) => {
            state.socketData?.emit("login", payload);
        },
        ChatRequest: (state, { payload }) => {
            state.socketData?.emit("chatRequest", payload);
        },
        SendMessage: (state, { payload }) => {
            state.socketData?.emit("message", payload);
        },
        EndChat: (state, { payload }) => {
            state.socketData?.emit("endChat", { id: payload.id }, payload.callback);
        },
    }
})
export const { Initialize, OnLoginEmit, ChatRequest, SendMessage, EndChat } = SocketReducer.actions
export default SocketReducer.reducer