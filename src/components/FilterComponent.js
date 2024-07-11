import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider, PickersTextField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt, FaTimes } from "react-icons/fa";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const Operators2 = [
  { type: "string", operator: "contains" },
  { type: "string", operator: "equals" },
  { type: "string", operator: "starts with" },
  { type: "string", operator: "ends with" },
  { type: "string", operator: "is empty" },
  { type: "number", operator: "=" },
  { type: "number", operator: "!=" },
  { type: "number", operator: ">" },
  { type: "number", operator: "<" },
  { type: "number", operator: ">=" },
  { type: "number", operator: "<=" },
  { type: "number", operator: "is empty" },
  { type: "number", operator: "is not empty" },
  { type: "boolean", operator: "is" },
  { type: "date", operator: "is" },
  { type: "date", operator: "is not" },
  { type: "date", operator: "is after" },
  { type: "date", operator: "is before" },
  { type: "date", operator: "is empty" },
];

const Operators= {
  string: [
    "contains",
    "equals",
    "starts with",
    "ends with",
    "is empty",
  ],
  number: [
    "=",
    "!=",
    ">",
    "<",
    ">=",
    "<=",
    "is empty",
    "is not empty",
  ],
  boolean: ["is"],
  date: [
    "is",
    "is not",
    "is after",
    "is before",
    "is empty",
  ],
};

const FilterComponent = ({
  columns,
  selectedColumn,
  values,
  onApplyFilters,
  rows
}) => {
  const [filters, setFilters] = useState([{ column: "", operator: "", value: "", columnType: "" }]);

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
    setFilters([...filters, { filterType: "and", column: firstColumn, operator: columnOperator[0], value: "", columnType: columnType }]);
  };
  
  const handleRemoveFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  const handleRemoveAllFilters = () => {
    // setFilters([{ column: "", operator: "", value: "",columnType: ""  }]);
    initialFilterRow();
  };

  const handleChange = (index, field, value) => {
    const newFilters = [...filters];
    const columnType = getColumnType(value);
    const columnOperator = Operators[columnType];    

    newFilters[index][field] = value;
    if (field === "column") {
      newFilters[index]["columnType"] = columnType; //get column type 
      newFilters[index]["operator"] = columnOperator[0]; // Reset operator when column changes
    }
    setFilters(newFilters);
  };


  const initialFilterRow = () => {
    
    const columnType = getColumnType(selectedColumn[0]);
    const columnOperator = Operators[columnType];
    setFilters([{ column: selectedColumn[0], operator: columnOperator[0], value: "", columnType: columnType }]);
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
  console.log(filters);
  console.log(columns);
  console.log(selectedColumn);
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      {filters.map((filter, index) => (
        <div key={index} className="flex items-center mb-2 justify-between">
          {filter.filterType ? (
            <>
              <button
                className="text-red-500 mr-3 mt-5"
                onClick={() => handleRemoveFilter(index)}>
                <FaTimes />
              </button>
              <FormControl
                sx={{ width: "110px", padding: "0px 2px", marginTop: "17px" }}>
                <NativeSelect
                  size="small"
                  className="border p-1 rounded mr-2"
                  value={filter.filterType}
                  onChange={(e) =>
                    handleChange(index, "filterType", e.target.value)
                  }>
                  <option value="and">AND</option>
                  <option value="or">OR</option>
                </NativeSelect>
              </FormControl>
            </>
          ) : (
            <span
              className={filters[1]?.filterType ? "w-[145px]" : "w-0"}></span>
          )}
          <FormControl>
            <InputLabel variant="standard">Column</InputLabel>
            <NativeSelect
              size="small"
              sx={{ minWidth: "150px" }}
              className="border p-1 rounded mr-2"
              value={filter.column || selectedColumn[0]}
              onChange={(e) => handleChange(index, "column", e.target.value)}>
              {columns.map((col, i) => (
                <option key={i} value={col.name}>
                  {col.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel variant="standard">Operator</InputLabel>
            <NativeSelect
              variant="filled"
              size="small"
              sx={{ minWidth: "80px", maxWidth: "100px" }}
              className="border p-1 rounded mr-2"
              value={filter.operator || filter.operator[0]}
              onChange={(e) => handleChange(index, "operator", e.target.value)}>
              {Operators[filter.columnType]?.map((op, i) => (
                <option key={i} value={op}>
                  {op}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          {filter.columnType == "string" || filter.columnType == "number" ? (
            <TextField
              label="value"
              placeholder="Filter Value"
              variant="standard"
              size="small"
              style={{ marginTop: "6px" }}
              className="border p-1 rounded"
              value={filter.value}
              defaultValue={filter.value}
              onChange={(e) => handleChange(index, "value", e.target.value)}
            />
          ) : (
            // <LocalizationProvider dateAdapter={AdapterDayjs}>
            //   <DatePicker
            //       label="Value"
            //        inputFormat="DD-MM-YYYY"
            //     format="DD/MM/YYYY"
            //     variant="standard"
            //     size="small"
            //     style={{ marginTop: "23px", minWidth: "160px" }}
            //     className="border p-1 rounded"
            //     value={filter.value ? dayjs(filter.value) : null}
            //     onChange={(newValue) =>
            //       handleChange(
            //         index,
            //         "value",
            //         newValue ? newValue.format("DD/MM/YYYY") : ""
            //       )
            //     }

            //   />
            // </LocalizationProvider>
                <TextField
                  type="date"
              placeholder="Filter Value"
              variant="standard"
              size="small"
              style={{ marginTop: "23px",minWidth:'160px' }}
              className="border p-1 rounded"
              value={filter.value ? dayjs(filter.value).format('MM/DD/YYYY') : null}
              defaultValue={filter.value}
              onChange={(e) => handleChange(index, "value",dayjs(e.target.value).format("DD/MM/YYYY"))}
            />
          )}
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
          onClick={() => onApplyFilters(rows, filters)}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;


//  <NativeSelect
//               variant="filled"
//               size="small"
//               className="border p-1 rounded mr-2"
//               defaultValue={operators[0]}
//               value={filter.operator || operators[0]}
//               onChange={(e) => handleChange(index, "operator", e.target.value)}>
//               {operators.map((op, i) => (
//                 <option key={i} value={op}>
//                   {op}
//                 </option>
//               ))}
//             </NativeSelect>

// <NativeSelect
// variant="filled"
// size="small"
// className="border p-1 rounded mr-2"
// value={filter.operator || '' }
// onChange={(e) => handleChange(index, "operator", e.target.value)}>
// {Operators.filter(item => item?.type === typeof(rows[column])).map((op, i) => (
//   <option key={i} value={op.operator} >
//     {op.operator}
//   </option>
// ))}
// </NativeSelect>
