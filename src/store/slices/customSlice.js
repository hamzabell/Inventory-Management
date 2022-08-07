import { createSlice } from "@reduxjs/toolkit"

const initialState = {};

const customSlice = createSlice({
    name:'custom',
    initialState,
    reducers: {
        addCustom: (state, action) => {
            const prevData = state[action.payload.name] || [];
            return {
                ...state,
                [action.payload.name]: [...prevData, action.payload.data]
            };
        },
        editCustomName: (state, action) => {
            const {prev, newName} = action.payload;
            return Object.entries(state).reduce((acc, [key, value]) => {
                if(prev === key) {
                    return { ...acc, [newName]: state[prev] }
                }

                return { ...acc, [key]: value }

            }, {})
        },
        removeName: (state, action) => {
            const { name } = action.payload;
            return Object.entries(state).reduce((acc, [key, value]) => {
                if(key !== name) {
                    return { ...acc, [key]: value }
                }

            }, {})

        },
        editCustomModel: (state, action) => {
            const { name, id, data } = action.payload;
            const oldData = state[name];

            const editedData = [...oldData];

            editedData[id] = data;


            return {
                ...state,
                [name]: editedData
            }



        },
        deleteItem: (state, action) => {
            const { name, id } = action.payload;
            const data = state[name];

            const updatedData = data.filter((el, i) => i!==id);


            return {
                ...state,
                [name]: updatedData
            }

        }
    }
})


export const selectAllCustom =(state) => state.custom;
export const { addCustom, editCustomName, deleteItem, editCustomModel, removeName } = customSlice.actions;

export default customSlice.reducer;