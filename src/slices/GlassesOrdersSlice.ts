import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { RootState } from '../store';


interface GlassesOrderState {
    glasses_order_id: number,
    status: string,
    date_created: string,
    creator: string,
    date_formed: string,
    moderator: string,
    order_sum: number,
    phone: string,
    date_ended: string
}

interface GlassesOrdersState {
    glasses_orders: GlassesOrderState[],
    GlassesOrderSearchValues: {
    status: string,
    min_date_formed: string,
    max_date_formed: string
    },
    loading: boolean,
    error: string | null
}

const initialState: GlassesOrdersState = {
    glasses_orders: [],
    GlassesOrderSearchValues: {
        status: '',
        min_date_formed: '',
        max_date_formed: ''
        },
    loading: false,
    error: null,
};

export const getGlassesOrders = createAsyncThunk(
    'GlassesOrders/getGlassesOrders',
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const glassesOrderState = state.GlassesOrdersSlice;
        try{
            const response = await api.glassesOrders.glassesOrdersList({
                status: glassesOrderState.GlassesOrderSearchValues.status,
                min_date_formed: glassesOrderState.GlassesOrderSearchValues.min_date_formed,
                max_date_formed: glassesOrderState.GlassesOrderSearchValues.max_date_formed
            });
            return response.data;
        }catch (error){
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
);

const GlassesOrdersSlice = createSlice({
    name: 'GlassesOrder',
    initialState,
    reducers: {
        setSearchGlassesOrderValues(state, {payload}) {
            if (payload.status != undefined) state.GlassesOrderSearchValues.status = payload.status
            if (payload.min_date_formed != undefined) state.GlassesOrderSearchValues.min_date_formed = payload.min_date_formed
            if (payload.max_date_formed != undefined) state.GlassesOrderSearchValues.max_date_formed = payload.max_date_formed
        },
        resetGlassesOrders(state){
            state.GlassesOrderSearchValues = initialState.GlassesOrderSearchValues
            state.glasses_orders = initialState.glasses_orders
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getGlassesOrders.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getGlassesOrders.fulfilled, (state, {payload}) => {
                    state.glasses_orders = payload;
                    state.loading = false;
                })
                .addCase(getGlassesOrders.rejected, (state, {payload}) => {
                    state.loading = false;
                    state.error = (payload as string) || 'Ошибка при получении данных';
                });
        }
    });
    
    export const {setSearchGlassesOrderValues, resetGlassesOrders} = GlassesOrdersSlice.actions;
    export default GlassesOrdersSlice.reducer;
