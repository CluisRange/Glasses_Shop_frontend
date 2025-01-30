import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { resetGlassesOrders } from './GlassesOrdersSlice';

interface draftGlassesOrderState {
    glasses_order_id?: number;
    lenses_count: number | undefined;

    lenses: Lens[];
    phone?: string | null;
    order_sum?: number | null;
    error: string | null;
    isDraft: boolean;
    loading: boolean
}

interface Lens {
    lens?: { 
        lens_id?: number | undefined; 
        name: string
        url: string
        price: number
    } | undefined;
    dioptres: string;  

}

const initialState: draftGlassesOrderState = {
    glasses_order_id: NaN,  
    lenses_count: NaN,

    lenses: [],
    phone: '',
    order_sum: 0,
    error: null,
    isDraft: false,
    loading: false
};

export const getGlassesOrder = createAsyncThunk(
    'GlassesOrder/getGlassesOrder',
    async (GlassesOrderId: string) => {
        const response = await api.glassesOrder.glassesOrderRead(GlassesOrderId);
        return response.data;
    }
);

export const addLensToGlassesOrder = createAsyncThunk(
    'GlassesOrder/addLensToGlassesOrder',
    async (lensId: number) => {
        const response = await api.lens.lensAddCreate(lensId.toString());
        return response.data;
    }
);

export const deleteGlassesOrder = createAsyncThunk(
    'GlassesOrder/deleteGlassesOrder',
    async (GlassesOrderId: string) => {
        const response = await api.glassesOrder.glassesOrderDelete(GlassesOrderId);
        return response.data;
    }
);

export const updateGlassesOrderFields = createAsyncThunk(
    'GlassesOrder/updateGlassesOrder',
    async ({ GlassesOrderId, phone }: { GlassesOrderId: string; phone: string }) => {
      const response = await api.glassesOrder.glassesOrderUpdate(GlassesOrderId, { phone });
      return response.data;
    }
  );

export const saveGlassesOrder = createAsyncThunk(
    'GlassesOrder/saveGlassesOrder',
    async (GlassesOrderId: string) => {
        const response = await api.glassesOrder.glassesOrderSaveUpdate(GlassesOrderId);
        return response.data;
    }
)

export const deleteLensFromGlassesOrder = createAsyncThunk(
    'GlassesOrder/deleteLensFromGlassesOrder',
    async ({ GlassesOrderId, lensId }: { GlassesOrderId: number; lensId: number }) => {
      await api.lensesInOrder.lensesInOrderDelete(
        GlassesOrderId.toString(),
        lensId.toString()
      ); 
    }
)

export const updateLensDioptres = createAsyncThunk(
    'GlassesOrder/updateLensDioptres',
    async ({ GlassesOrderId, lensId, dioptres }: { GlassesOrderId: number; lensId: number; dioptres: string }) => {
        await api.lensesInOrder.lensesInOrderUpdate(
            GlassesOrderId.toString(),
            lensId.toString(),
            {  dioptres } // Ensure dioptres is included in the request body
        );
        
    }
)

;

const draftGlassesOrderSlice = createSlice({
    name: 'GlassesOrder',
    initialState,
    reducers: {
        setDraftGlassesOrderId: (state, action) => {
            state.glasses_order_id = action.payload;
        },
        setLensesCount: (state, action) => {
            state.lenses_count = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setLenses: (state, action) => {
            state.lenses = action.payload;
        },
        resetDraftGlassesOrder: (state) => {
            state.glasses_order_id = initialState.glasses_order_id;
            state.lenses_count = initialState.lenses_count;
            state.lenses = initialState.lenses;
            state.phone = initialState.phone; 
            state.order_sum = initialState.order_sum;
            state.isDraft = initialState.isDraft;

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGlassesOrder.pending, (state) => {
            state.loading = true;
            })
            .addCase(getGlassesOrder.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.isDraft = action.payload.status === 'draft';
                state.glasses_order_id = action.payload.glasses_order_id;
                state.phone = action.payload.phone;
                state.order_sum = action.payload.order_sum;
                state.lenses = action.payload.lenses || [];
                state.error = null;
            }
            })
            .addCase(getGlassesOrder.rejected, (state) => {
            state.loading = false;
            state.error = 'Ошибка при загрузке данных';
            })

            .addCase(deleteGlassesOrder.pending, (state) => {
            state.loading = true;
            
            })
            .addCase(deleteGlassesOrder.fulfilled, (state) => {
            state.loading = false;
            state = initialState;
            
            })
            .addCase(deleteGlassesOrder.rejected, (state) => {
            state.loading = false;
            state.error = 'Ошибка при удалении заявки';
            })

            .addCase(updateGlassesOrderFields.pending, (state) => {
            state.loading = true;
            })
            .addCase(updateGlassesOrderFields.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
            })
            .addCase(updateGlassesOrderFields.rejected, (state) => {
            state.loading = false;
            state.error = 'Ошибка при обновлении данных';
            })

            .addCase(saveGlassesOrder.pending, (state) => {
            state.loading = true;
            })
            .addCase(saveGlassesOrder.fulfilled, (state) => {
            state.loading = false;
            state = initialState;
            
            })
            .addCase(saveGlassesOrder.rejected, (state) => {
            state.loading = false;
            state.error = 'Заполните все дополнительные поля';
            })

            .addCase(deleteLensFromGlassesOrder.pending, (state) => {
            state.loading = true;
            })
            .addCase(deleteLensFromGlassesOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.lenses = state.lenses.filter((lens) => lens.lens?.lens_id !== action.meta.arg.lensId);
            state.error = null;
            })
            .addCase(deleteLensFromGlassesOrder.rejected, (state) => {
            state.loading = false;
            state.error = 'Ошибка при удалении линзы';
            })

            .addCase(updateLensDioptres.pending, (state) => {
            state.loading = true;
            })
            .addCase(updateLensDioptres.fulfilled, (state, action) => {
            state.loading = false;
            const { lensId, dioptres } = action.meta.arg;
            const lens = state.lenses.find((lens) => lens.lens?.lens_id === lensId);
            if (lens) {
                lens.dioptres = dioptres;
            }
            state.error = null;
            })
            .addCase(updateLensDioptres.rejected, (state) => {
            state.loading = false;
            state.error = 'Ошибка при обновлении диоптрий линзы';
            });
    }
});

export const {setError, setDraftGlassesOrderId, setLensesCount, setPhone, setLenses, resetDraftGlassesOrder} = draftGlassesOrderSlice.actions;
export default draftGlassesOrderSlice.reducer;