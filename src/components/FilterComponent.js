import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt, FaTimes, FaFilter } from "react-icons/fa";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeAllFilter, removeFilter, setFilterValue, setInitialFilter } from "../store/slice/FilterSlice";
import { Operators } from "../utils/helper";
import { FaXmark } from "react-icons/fa6";



const FilterComponent = ({
  columns,
  selectedColumn,
  values,
  onApplyFilters,
  onRemoveFilters,
  rows
}) => {
  // const [filters, setFilters] = useState([{ column: "", operator: "", value: "", columnType: "" }]);
  
  const dispatch = useDispatch();
  const filterRows = useSelector(state => state.filter.filters);
  console.log(filterRows)
  //for getting selected column type
  const getColumnType = (columnName) => {     
    const column = columns.find((col) => col.name === columnName);
    return column ? column.type : "";
  };


  //Add filter handler 
  const handleAddFilter = () => {
    const firstColumn = columns[0].name;
    const columnType = getColumnType(firstColumn);
    const columnOperator = Operators[columnType];    
    console.log(columnOperator)
    dispatch(addFilter({ firstColumn, columnType, columnOperator }))
    // setFilters([...filters, { filterType: "and", column: firstColumn, operator: columnOperator[0], value: "", columnType: columnType }]);
  };
  
  const handleRemoveFilter = (index) => {
    // const newFilters = [...filters];
    // newFilters.splice(index, 1);
    // setFilters(newFilters);
    dispatch(removeFilter({index}))
  };

  const handleRemoveAllFilters = () => {
    // setFilters([{ column: "", operator: "", value: "",columnType: ""  }]);
    initialFilterRow();
    onRemoveFilters();
    // dispatch(removeAllFilter())
  };

  const handleChange = (index, field, value) => {
    dispatch(setFilterValue({ index, field, value, columns }));
  };


  const initialFilterRow = () => {
    
    const columnType = getColumnType(selectedColumn[0]);
    const columnOperator = Operators[columnType];
    //setFilters([{ column: selectedColumn[0], operator: columnOperator[0], value: "", columnType: columnType }]);
    dispatch(setInitialFilter([{ column: selectedColumn[0], operator: columnOperator[0], value: "", columnType: columnType }]))
  }

  useEffect(() => {
    initialFilterRow();
  },[])

 
  // const handleChange = (index, field, value) => {
  //   const newFilters = [...filters];
  //   newFilters[index][field] = value;
  //   setFilters(newFilters);
  // };

  // const renderValueControl = (columnType, filter, index) => {
  //   switch (columnType) {
  //     case 'string':
  //       return (<TextField
  //           label="value"
  //           placeholder="Filter Value"
  //           variant="standard"
  //           size="small"
  //           style={{ marginTop: "6px" }}
  //           className="border p-1 rounded"
  //           value={filter.value}
  //           defaultValue={filter.value}
  //           onChange={(e) => handleChange(index, "value", e.target.value)}
  //         />)
  //       break;
  //       case 'date':
  //       return (<TextField
  //           type="date"
  //             label="value"
  //             placeholder="Filter Value"
  //             variant="standard"
  //             size="small"
  //             style={{ marginTop: "6px" }}
  //             className="border p-1 rounded"
  //             value={filter.value}
  //             defaultValue={filter.value}
  //             onChange={(e) => handleChange(index, "value", e.target.value)}
  //           />)
  //         break;
  //     default:
  //       break;
  //   }
  // }

  // console.log(rows[selectedColumn]);
  console.log(rows);
  // console.log(filters);
  console.log(columns);
  console.log(selectedColumn);


  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
        <FaFilter className="mr-2" />
        Filter Configuration
      </h2>
      <div className="space-y-2">
        {filterRows.map((filter, index) => (
          <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
            <button
              className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
              onClick={() => handleRemoveFilter(index)}
            >
              <FaTimes />
            </button>
            {index > 0 && (
              <FormControl size="small" className="w-24 flex-shrink-0">
                <InputLabel>Condition</InputLabel>
                <Select
                  value={filter.filterType}
                  onChange={(e) => handleChange(index, "filterType", e.target.value)}
                  label="Condition"
                >
                  <MenuItem value="and">AND</MenuItem>
                  <MenuItem value="or">OR</MenuItem>
                </Select>
              </FormControl>
            )}
            <FormControl size="small" className="w-1/4 min-w-[120px] flex-shrink-0">
              <InputLabel>Column</InputLabel>
              <Select
                value={filter.column || selectedColumn[0]}
                onChange={(e) => handleChange(index, "column", e.target.value)}
                label="Column"
              >
                {columns.map((col, i) => (
                  <MenuItem key={i} value={col.name}>
                    {col.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" className="w-1/4 min-w-[100px] flex-shrink-0">
              <InputLabel>Operator</InputLabel>
              <Select
                value={filter.operator || filter.operator[0]}
                onChange={(e) => handleChange(index, "operator", e.target.value)}
                label="Operator"
              >
                {Operators[filter.columnType]?.map((op, i) => (
                  <MenuItem key={i} value={op}>
                    {op}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {filter.columnType === "string" || filter.columnType === "number" ? (
              <TextField
                label="Value"
                variant="outlined"
                size="small"
                className="w-1/4 min-w-[120px] flex-shrink-0"
                value={filter.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
              />
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Value"
                  inputFormat="DD/MM/YYYY"
                  value={filter.value ? dayjs(filter.value, "DD/MM/YYYY") : null}
                  onChange={(newValue) =>
                    handleChange(
                      index,
                      "value",
                      newValue ? newValue.format("DD/MM/YYYY") : ""
                    )
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      className="w-1/4 min-w-[120px] flex-shrink-0"
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FaPlus />}
          onClick={handleAddFilter}
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          Add Filter
        </Button>
        <div className="space-x-2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => onApplyFilters(rows, filterRows)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Apply Filters
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<FaTrashAlt />}
            onClick={handleRemoveAllFilters}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Remove All Filters
          </Button>
        </div>
      </div>
    </div>
  )
};

export default FilterComponent;
