import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaPlus, FaTrashAlt, FaTimes } from "react-icons/fa";

const FilterComponent = ({
  columns,
  column,
  operators,
  values,
  onApplyFilters,
}) => {
  const [filters, setFilters] = useState([
    { column: "", operator: "", value: "" },
  ]);

  const handleAddFilter = () => {
    setFilters([
      ...filters,
      { filterType: "and", column: "", operator: "", value: "" },
    ]);
  };

  const handleRemoveFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  const handleRemoveAllFilters = () => {
    setFilters([{ column: "", operator: "", value: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newFilters = [...filters];
    newFilters[index][field] = value;
    setFilters(newFilters);
  };
  console.log(filters.length);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      {filters.map((filter, index) => (
        <div key={index} className="flex items-center mb-2">
          <button
            className="text-red-500 mr-3 mt-5"
            onClick={() => handleRemoveFilter(index)}>
            <FaTimes />
              </button>
              {filter.filterType ? (
                <FormControl sx={{width:'110px' , padding:'0px 2px', marginTop:'17px'}}>
                <NativeSelect
                    size="small"
                    className="border p-1 rounded mr-2"
                    value={filter.filterType}
                    onChange={(e) => handleChange(index, "filterType", e.target.value)}>
                    <option value='and'>
                        AND
                    </option>
                    <option value='or'>
                        OR
                    </option>
                </NativeSelect>
                  </FormControl>
              ) : (
                      <span className={filters[1]?.filterType ? "w-[110px]" : 'w-0'}></span>
              )}
              <FormControl>
            <InputLabel variant="standard">Column</InputLabel>
            <NativeSelect
              size="small"
              className="border p-1 rounded mr-2"
              defaultValue={column}
              value={filter.column || column}
              onChange={(e) => handleChange(index, "column", e.target.value)}>
              {columns.map((col, i) => (
                <option key={i} value={col}>
                  {col}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel variant="standard">Operator</InputLabel>
            <NativeSelect
              variant="filled"
              size="small"
              className="border p-1 rounded mr-2"
              defaultValue={operators[0]}
              value={filter.operator || operators[0]}
              onChange={(e) => handleChange(index, "operator", e.target.value)}>
              {operators.map((op, i) => (
                <option key={i} value={op}>
                  {op}
                </option>
              ))}
            </NativeSelect>
          </FormControl>

          <TextField
            label="value"
            placeholder="Filter Value"
            variant="standard"
                  size="small"
                  style={{marginTop:'6px'}}
            className="border p-1 rounded"
            value={filter.value}
            defaultValue={filter.value}

            onChange={(e) => handleChange(index, "value", e.target.value)}
          />
        </div>
      ))}
      <div className="flex justify-between items-center mt-4">
        <button
          className="flex items-center text-blue-500"
          onClick={handleAddFilter}>
          <FaPlus className="mr-1" /> ADD FILTER
        </button>
        <button
          className="flex items-center text-red-500"
          onClick={handleRemoveAllFilters}>
          <FaTrashAlt className="mr-1" /> REMOVE ALL
        </button>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={() => onApplyFilters(filters)}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
