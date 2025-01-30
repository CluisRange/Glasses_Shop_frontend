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

export const updateLens = createAsyncThunk(
    'lenses/updateLens',
    async (lens: Lens, {rejectWithValue}) => {
        try{
            const response = await api.lens.lensUpdate(lens.lens_id?.toString() || '', lens);
            return response.data;
        }catch (error: any){
            return rejectWithValue(error.response.data.error || 'Ошибка при обновлении данных');
        }
    }
)

export const uploadLens = createAsyncThunk(
    'lenses/uploadLens',
    async (lens: Lens, { rejectWithValue }) => {
        try {
            const response = await api.lenses.lensesCreate(lens);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.error || 'Ошибка при добавлении линзы');
        }
    }
)

interface UploadImagePayload {
    id: string;
    file: File | null;
  }

export const uploadImage = createAsyncThunk(
    'images/upload',
    async ({ id, file }: UploadImagePayload) => {
        if (!file) {
          throw new Error("Пожалуйста, выберите изображение для загрузки");
        }
    
        const formData = new FormData();
        formData.append('image', file); // Add the file to FormData
    
        // Call your API
        await api.lens.lensAddPictureCreate(id, {
          body: formData,
        });
      }
  );
;

const lensesSlice = createSlice({
    name: 'lenses',
    initialState,

    reducers: {
        setSearchLensValues(state, {payload}) {
            if (payload.name != undefined) state.SearchLensValues.name = payload.name
            if (payload.minPrice != undefined) state.SearchLensValues.minPrice = payload.minPrice
            if (payload.maxPrice != undefined) state.SearchLensValues.maxPrice = payload.maxPrice
        },
        setLensChange(state, {payload}) {
            state.lenses = state.lenses.map((lens) => {
                if (lens.lens_id === payload.id) {
                    lens.description = payload.description;
                    lens.price = payload.price;
                    lens.status = payload.status;
                    return payload;
                }
                return null;
            });
        },
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
        builder.addCase(updateLens.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateLens.fulfilled, (state, { payload }) => {

            state.loading = false;
        });
        builder.addCase(updateLens.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
        builder.addCase(uploadImage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(uploadImage.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(uploadImage.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
        
        builder.addCase(uploadLens.pending, (state) => {    
            state.loading = true;
        });
        builder.addCase(uploadLens.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(uploadLens.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
    }
});

export const useSearchLensValues = () => useSelector((state: RootState) => state.lenses.SearchLensValues)
export const useLoadingStatus = () => useSelector((state: RootState) => state.lenses.loading)


export const {
    setSearchLensValues: setSearchLensValuesAction,
    setLensChange: setLensChangeAction
} = lensesSlice.actions

export default lensesSlice.reducer