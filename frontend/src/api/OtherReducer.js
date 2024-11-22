import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const GetTarot = createAsyncThunk(
    'GetTarot',
    async ({ id }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/tarot/${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const GetHoroscope = createAsyncThunk(
    'GetHoroscope',
    async ({ zodiac }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/my-horoscope?q=${zodiac}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const GetRechargeOffer = createAsyncThunk(
    'GetRechargeOffer',
    async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/rechargeOffer`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const AddRecharge = createAsyncThunk(
    'AddRecharge',
    async (body) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/v1/recharge`, body)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const GetRecharge = createAsyncThunk(
    'GetRecharge',
    async ({ id }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/recharge?id=${id}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const DailyReward = createAsyncThunk(
    'DailyReward',
    async ({ id, strick }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/collect?id=${id}&strick=${strick}`)
            return response.data
        } catch (err) {
            return err.response.data
        }

    }
)
export const GetGift = createAsyncThunk(
    'GetGift',
    async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/gift")
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)
export const AstroGift = createAsyncThunk(
    'AstroGift',
    async (body) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/astrogift", body)
            return response.data
        } catch (err) {
            return err.response.data
        }
    }
)


const userReducer = createSlice({
    name: "user",
    initialState: { tarot: {}, horoscope: {}, rechargeOffer: [], recharge: [], category: [], gift: [] },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(GetTarot.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.tarot = payload.tarot;
                }
            })
            .addCase(GetHoroscope.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.horoscope = payload.horoscope;
                }
            }).addCase(GetRechargeOffer.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.rechargeOffer = payload.rechargeOffer;
                }
            }).addCase(GetGift.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.gift = payload.gift;
                }
            })
            .addCase(GetRecharge.fulfilled, (state, { payload }) => {
                if (payload?.success) {
                    state.recharge = payload.rechargeHistory;
                }
            })

    }



}
)
export default userReducer.reducer