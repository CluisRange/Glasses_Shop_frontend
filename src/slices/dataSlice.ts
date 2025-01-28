import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        SearchLensValues: {
            name: '',
            minPrice: '',
            maxPrice: '',
        },
    },
    reducers: {
        setSearchLensValues(state, {payload}) {
            state.SearchLensValues.name = payload.name
            state.SearchLensValues.minPrice = payload.minPrice
            state.SearchLensValues.maxPrice = payload.maxPrice
        }
    }
})

export const useSearchLensValues = () => useSelector((state: RootState) => state.ourData.SearchLensValues)
export const {
    setSearchLensValues: setSearchLensValuesAction
} = dataSlice.actions

export default dataSlice.reducer