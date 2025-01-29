import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dataReducer from "./slices/lensesSlice"
import userReducer from './slices/userSlice'; 
import draftGlassesOrderSlice from './slices/draftGlassesOrderSlice';
import GlassesOrdersSlice from './slices/GlassesOrdersSlice';

export const store = configureStore({
    reducer: combineReducers({
        lenses: dataReducer,
        user: userReducer, 
        draftGlassesOrderSlice: draftGlassesOrderSlice, 
        GlassesOrdersSlice: GlassesOrdersSlice,

    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch