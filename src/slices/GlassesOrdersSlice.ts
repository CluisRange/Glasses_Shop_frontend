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
    date_ended: string,
    qr: string
}

interface GlassesOrdersState {
    glasses_orders: GlassesOrderState[],
    GlassesOrderSearchValues: {
    status: string,
    min_date_formed: string,
    max_date_formed: string,
    creator: string
    },
    loading: boolean,
    error: string | null
}

const initialState: GlassesOrdersState = {
    glasses_orders: [],
    GlassesOrderSearchValues: {
        status: '',
        min_date_formed: '',
        max_date_formed: '',
        creator: ''
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

export const acceptOrder = createAsyncThunk(
    'GlassesOrders/acceptOrder',
    async (orderId: number, { rejectWithValue }) => {
        try {
            const response = await api.glassesOrder.glassesOrderModerateUpdate(orderId.toString(), {"isAccepted": 1});
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при принятии заказа');
        }
    }
);

export const rejectOrder = createAsyncThunk(
    'GlassesOrders/rejectOrder',
    async (orderId: number, { rejectWithValue }) => {
        try {
            const response = await api.glassesOrder.glassesOrderModerateUpdate(orderId.toString(), {"isAccepted": 0});
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при отклонении заказа');
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
            if (payload.creator != undefined) state.GlassesOrderSearchValues.creator = payload.creator
        },
        resetGlassesOrders(state){
            state.GlassesOrderSearchValues = initialState.GlassesOrderSearchValues
            state.glasses_orders = initialState.glasses_orders
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getGlassesOrders.pending, (state) => {

                })
                .addCase(getGlassesOrders.fulfilled, (state, {payload}) => {
                    state.glasses_orders = payload;
                    state.loading = false;
                })
                .addCase(getGlassesOrders.rejected, (state, {payload}) => {
                    state.loading = false;
                    state.error = (payload as string) || 'Ошибка при получении данных';
                })

                .addCase(acceptOrder.pending, (state) => {

                })
                .addCase(acceptOrder.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    const order = state.glasses_orders.find(order => order.glasses_order_id === payload.glasses_order_id);
                    if (order) {
                        order.status = 'accepted';
                    }
                })
                .addCase(acceptOrder.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = (payload as string) || 'Ошибка при принятии заказа';
                })

                .addCase(rejectOrder.pending, (state) => {
                    state.loading = true;
                })
                .addCase(rejectOrder.fulfilled, (state, { payload }) => {
                    state.loading = false;
                    const order = state.glasses_orders.find(order => order.glasses_order_id === payload.glasses_order_id);
                    if (order) {
                        order.status = 'canselled';
                    }
                })
                .addCase(rejectOrder.rejected, (state, { payload }) => {
                    state.loading = false;
                    state.error = (payload as string) || 'Ошибка при отклонении заказа';
                });
        }
    });
    
    export const {setSearchGlassesOrderValues, resetGlassesOrders} = GlassesOrdersSlice.actions;
    export default GlassesOrdersSlice.reducer;
