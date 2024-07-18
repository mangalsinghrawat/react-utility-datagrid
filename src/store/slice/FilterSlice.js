import { createSlice } from "@reduxjs/toolkit";
import { Operators } from "../../utils/helper";
import dayjs from "dayjs";


const initialState = {
    filters: []
}


const FilterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setInitialFilter: (state, action) => {
            state.filters = action.payload
        },
        setFilterValue: (state, action) => {
            const { index, field, value, columns } = action.payload;
            const columnType = columns.find((col) => col.name === value)?.type;
            const columnOperator = Operators[columnType];

            state.filters[index][field] = value;

            if (field === "column") {
                state.filters[index]["columnType"] = columnType;
                state.filters[index]["operator"] = columnOperator[0];
            }

            if (field === "value" && columnType === "date") {
                state.filters[index][field] = value ? dayjs(value).format("DD/MM/YYYY") : "";
            } else {
                state.filters[index][field] = value;
            }
        },
        addFilter: (state, action) => {
            const { firstColumn, columnType, columnOperator } = action.payload;
            
            state.filters.push({ filterType: "and", column: firstColumn, operator: columnOperator[0], value: "", columnType: columnType })
        },
        removeFilter: (state, action) => {
            const { index } = action.payload;
            state.filters.splice(index, 1);
        }        
    }
})

export const { setFilterValue,setInitialFilter,addFilter,removeFilter, removeAllFilter } = FilterSlice.actions
export default FilterSlice.reducer
    