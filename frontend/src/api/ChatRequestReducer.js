import { createSlice } from "@reduxjs/toolkit"

const ChatRequestReducer = createSlice({
    name: "socket",
    initialState: { AstroRequest: [],  },
    reducers: {
        ClientChat: (state, { payload }) => {
            state.AstroRequest.push(payload)
            const a = payload._id
            const b = state.AstroRequest.find((e) => e._id == a)
            if (!b._id) {
                state.AstroRequest.push(payload)
            }
        },
        RemoveRequest: (state, { payload }) => {
            state.AstroRequest = state.AstroRequest.filter((e) => e._id !== payload)
        },

    }
}
)
export const { ClientChat, RemoveRequest, } = ChatRequestReducer.actions
export default ChatRequestReducer.reducer