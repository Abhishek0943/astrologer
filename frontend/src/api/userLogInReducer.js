import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const TokenLogin = createAsyncThunk(
    'TokenLogin',
    async (body) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/tokenLogin", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const LoginUser = createAsyncThunk(
    'LoginUser',
    async (body) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/login", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const LandingEmail = createAsyncThunk(
    'LandingEmail',
    async (body) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/landingEmail", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const LandingForm = createAsyncThunk(
    'LandingForm',
    async (body) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/LandingForm", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const GetCategory = createAsyncThunk(
    'GetCategory',
    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/category")
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const SinginUser = createAsyncThunk(
    'SinginUser',
    async (body) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user", body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const VerifyEmail = createAsyncThunk(
    'VerifyEmail',
    async (body) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/verify", body)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const GetAstrologers = createAsyncThunk(
    'GetAstrologers',
    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/astro")
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const ForgetPass = createAsyncThunk(
    'ForgetPass',
    async (body) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/user/forgotPassword", body)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const resetPassword = createAsyncThunk(
    'resetPassword',
    async (body) => {
        try {
            const response = await axios.post("https://admin.unzziptruth.com/api/v1/user/resetPassword", body)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const GeneralUpdate = createAsyncThunk(
    'GeneralUpdate',
    async (body) => {
        try {
            const response = await axios.put("http://localhost:8000/api/v1/user/general", body)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const ChangePassword = createAsyncThunk(
    'ChangePassword',
    async (body) => {
        try {
            const response = await axios.put("http://localhost:8000/api/v1/user/change-password", body)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
const userReducer = createSlice({
    name: "user",
    initialState: { user: {}, token: "", astrologers: [], userReports: [], astrologer: {}, popup: false, popupMessage: {}, model: true },
    reducers: {
        PopupState: (state, action) => {
            state.popup = true
            state.popupMessage = action.payload
        },
        ClosePopupState: (state) => {
            state.popup = false
            state.popupMessage = {}
        },
        UpdateUserPayload: (state, { payload }) => {
            state.user = payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(LoginUser.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.user = payload.user;
                    state.token = payload.token;
                    localStorage.setItem("token", payload.token)

                }
            }) .addCase(SinginUser.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.user = payload.user;
                    state.token = payload.token;
                    localStorage.setItem("token", payload.token)

                }
            })
            .addCase(ChangePassword.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.user = payload.user;
                }
            }).addCase(TokenLogin.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.user = payload.user;
                }
            }).addCase(GeneralUpdate.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.user = payload.user;
                }
            }).addCase(GetAstrologers.fulfilled, (state, { payload }) => {
                if (payload.success) {
                    state.astrologers = payload.astrologers
                }
                else {
                    console.error(payload)
                }
            }).addCase(VerifyEmail.fulfilled, (state, { payload }) => {
                if (payload.success) {
                    state.user = payload.user
                    localStorage.setItem("token", payload.token)
                }
                else {
                    console.error(payload)
                }
            })
    }
}
)
export const { PopupState, ClosePopupState, UpdateUserPayload } = userReducer.actions
export default userReducer.reducer