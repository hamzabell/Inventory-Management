import { createSlice } from "@reduxjs/toolkit"
const initialState = [];




const typeSlice = createSlice({
    name:'types',
    initialState,
    reducers: {
        addType: (state, action) => {
            const newState = [...state, action.payload];
            return newState;
        },
        editType: (state, action) => {
            const { id, data } = action.payload;
            console.log(action.payload)
            const newState = state.filter((item, index) => index !== id );
            return [...newState, data];
        },
        deleteType: (state, action) => {
            const newState = state.filter((item, index) => index !== action.payload.id );

            return newState;
        }
    },
})


export const selectAllTypes =(state) => state.types;
export const { addType, deleteType, editType } = typeSlice.actions;

export default typeSlice.reducer;