import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { setDraftGlassesOrderId, setLensesCount } from './draftGlassesOrderSlice';
import { api } from '../api';
import { Lens } from '../api/Api';
import { LENSES_MOCK } from '../modules/Mock';

interface glassesState{
    SearchLensValues: {
        name: string,
        minPrice: string,
        maxPrice: string,
    },
    lenses: Lens[],
    loading: boolean,
    error: string | null
}

const initialState: glassesState = {
    SearchLensValues: {
        name: '',
        minPrice: '',
        maxPrice: '',
    },
    lenses: [],
    loading: false,
    error: null,
}

export const getLensesList = createAsyncThunk(
    'lenses/getLensesList',
    async (_, { getState, dispatch, rejectWithValue }) => {
        const state = getState() as RootState;
        const lensesState = state.lenses;
        try{
            const response = await api.lenses.lensesList({
                search_lens: lensesState.SearchLensValues.name,
                search_price_min: parseFloat(lensesState.SearchLensValues.minPrice) || 0,
                search_price_max: parseFloat(lensesState.SearchLensValues.maxPrice) || 1000000
            });

            const DraftGlassesOrderId = response.data.draft_GlassesOrder_id;
            const LensesCount = response.data.draft_GlassesOrder_lens_count;

            dispatch(setDraftGlassesOrderId(DraftGlassesOrderId));
            dispatch(setLensesCount(LensesCount));

            return response.data;
        }catch (error: any){
            return rejectWithValue(error.response.data.error || 'Ошибка при загрузке данных');
        }
    }
)

const lensesSlice = createSlice({
    name: 'lenses',
    initialState,

    reducers: {
        setSearchLensValues(state, {payload}) {
            if (payload.name != undefined) state.SearchLensValues.name = payload.name
            if (payload.minPrice != undefined) state.SearchLensValues.minPrice = payload.minPrice
            if (payload.maxPrice != undefined) state.SearchLensValues.maxPrice = payload.maxPrice
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getLensesList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getLensesList.fulfilled, (state, {payload}) => {
            state.lenses = payload.lenses;
            state.loading = false;
        });
        builder.addCase(getLensesList.rejected, (state) => {
            state.loading = false;
            state.lenses = LENSES_MOCK.lenses.filter((item) => 
                item.name.toLocaleLowerCase().startsWith(state.SearchLensValues.name) &&
                item.price >= parseFloat(state.SearchLensValues.minPrice) &&
                item.price <= parseFloat(state.SearchLensValues.maxPrice)
            );
        });
    }
})

export const useSearchLensValues = () => useSelector((state: RootState) => state.lenses.SearchLensValues)
export const useLoadingStatus = () => useSelector((state: RootState) => state.lenses.loading)

export const {
    setSearchLensValues: setSearchLensValuesAction
} = lensesSlice.actions

export default lensesSlice.reducer