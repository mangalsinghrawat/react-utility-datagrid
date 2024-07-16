import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { CiMenuKebab } from "react-icons/ci";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import PopupComponent from "./PopupComponent";
import FilterComponent from "./FilterComponent";
import ManageColumnComp from "./ManageColumnComp";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const UtilityDataGrid = ({
  pageSize = 10,
  columnHeaders,
  onRowClick,
  rowHeight,
  rows,
  sortingOrder,
  sx,
  enableRowClick = true,
  enableToolbar = true,
  rowsPerPage
}) => {
  const [finalData, setFinalData] = useState(rows);
  const [currentPage, setCurrentPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [enableFilterOptions, setEnableFilterOptions] = useState(false);
  const [filterColumnIndex, setFilterColumnIndex] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(columnHeaders);
  const [manageColumnsOpen, setManageColumnsOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [filteredData, setFilteredData] = useState(rows);
  const [selectedRowsPerPage, setSelectedRowsPerPage] = useState(pageSize)
  const filterRef = useRef(null);


  //For initial level load
  // useEffect(() => {
  //   setTotalPages(Math.ceil(rows.length / pageSize));
  //   setFinalData(
  //     rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  //   );
  // }, [rows, currentPage, pageSize]);

  // useEffect(() => {
  //   setFinalData(
  //     rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  //   );
  // }, [currentPage, pageSize, rows]);


  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / selectedRowsPerPage));
    setFinalData(
      filteredData.slice(currentPage * selectedRowsPerPage, (currentPage + 1) * selectedRowsPerPage)
    );
  }, [filteredData, currentPage,selectedRowsPerPage]);


  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);

    setFilterColumnIndex(null);
  };

  const handleFilterClick = (index) => {
    setEnableFilterOptions(!enableFilterOptions);
    setFilterColumnIndex(index);
    setAnchorEl(null);
    setMenuIndex(null);
  };

  const handlePopupClose = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setFilterColumnIndex(null);
    }
    setEnableFilterOptions(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
    setFilterColumnIndex(null);
    setManageColumnsOpen(false);
  };

  const handleManageColumnsClick = () => {
    setManageColumnsOpen(true);
    setAnchorEl(null);
    setMenuIndex(null);
  };
  
  const sortData = (key, direction) => {
    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      const isNumericA = !isNaN(aValue);
      const isNumericB = !isNaN(bValue);
      const isDateA = !isNaN(Date.parse(aValue));
      const isDateB = !isNaN(Date.parse(bValue));

      if (isNumericA && isNumericB) {
        return direction === "ASC" ? aValue - bValue : bValue - aValue;
      } else if (isDateA && isDateB) {
        const dateA = new Date(aValue);
        const dateB = new Date(bValue);
        return direction === "ASC" ? dateA - dateB : dateB - dateA;
      } else {
        const comparison = aValue.toString().localeCompare(bValue.toString());
        return direction === "ASC" ? comparison : -comparison;
      }
    });

    setFilteredData(sortedData);
    setCurrentPage(0); // Reset to first page after sorting
  };

  function getColumnTypes(columnHeader, row) {
    return columnHeader.map(col => {
      let type = typeof row[col];
      if (type === 'object' && row[col] === null) {
        type = 'string';
      } else if (type === 'number' && Number.isInteger(row[col])) {
        type = 'number';
      } else if (type === 'string' && !isNaN(Date.parse(row[col]))) {
        type = 'date';
      }
      return { name: col, type };
    });
  }
  const columnsWithTypes = getColumnTypes(columnHeaders, rows[0]);



  function applyFilter(data, filter) {
    const { column, operator, value, columnType } = filter;
    return data.filter(item => {
      const itemValue = item[column];
      switch (columnType) {
        case 'string':
          switch (operator) {
            case 'contains':
              return itemValue.toLowerCase().includes(value.toLowerCase());
            case 'equals':
              return itemValue.toLowerCase() === value.toLowerCase();
            case 'starts with':
              return itemValue.toLowerCase().startsWith(value.toLowerCase());
            case 'ends with':
              return itemValue.toLowerCase().endsWith(value.toLowerCase());
            case 'is empty':
              return itemValue === '';
            default:
              return false;
          }
        case 'number':
          const numValue = parseFloat(value);
          switch (operator) {
            case '=':
              return itemValue === numValue;
            case '!=':
              return itemValue !== numValue;
            case '>':
              return itemValue > numValue;
            case '<':
              return itemValue < numValue;
            case '>=':
              return itemValue >= numValue;
            case '<=':
              return itemValue <= numValue;
            case 'is empty':
              return itemValue === null || itemValue === undefined;
            case 'is not empty':
              return itemValue !== null && itemValue !== undefined;
            default:
              return false;
          }
        case 'boolean':
          const boolValue = (value === 'true');
          switch (operator) {
            case 'is':
              return itemValue === boolValue;
            default:
              return false;
          }
        case 'date':
          const itemDate = new Date(itemValue);
          const filterDate = new Date(value);
          switch (operator) {
            case 'is':
              return itemDate.getTime() === filterDate.getTime();
            case 'is not':
              return itemDate.getTime() !== filterDate.getTime();
            case 'is after':
              return itemDate > filterDate;
            case 'is before':
              return itemDate < filterDate;
            case 'is empty':
              return !itemValue;
            default:
              return false;
          }
        default:
          return false;
      }
    });
  }

  function filterData(data, filters) {
    let filteredData = data;
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      if (filter.filterType === 'and' || !filter.filterType) {
        filteredData = applyFilter(filteredData, filter);
      } else if (filter.filterType === 'or') {
        const tempData = applyFilter(data, filter);
        filteredData = [...new Set([...filteredData, ...tempData])];
      }
    }
   
    setFilteredData(filteredData);
    setCurrentPage(0); 
    // return filteredData;
  }
  const handleRowClickWrapper = (item, index) => {
    if (enableRowClick) {
      if (selectedRowIndex === index) {
        setSelectedRowIndex(null);
        onRowClick(null);  // Pass null to indicate no selection
      } else {
        setSelectedRowIndex(index);
        onRowClick(item);
      }
    }
  };


  return (
    <div className="">
      <div className="bg-slate-300 h-11 p-2 ">
        <marquee>
          ⚠️⚠️⚠️ This Toolbar is under construction...⚠️⚠️⚠️
        </marquee>{" "}
      </div>
      <div className="h-[400px] overflow-scroll">
        <table className="table-auto  w-full border-collapse border border-gray-300 ">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {visibleColumns.map((column, index) => (
                <th
                  className="text-sm border border-gray-300 p-2 relative group"
                  key={index}>
                  <div className="flex items-center justify-between cursor-pointer">
                    {column}
                    <IconButton
                      onClick={(event) => handleClick(event, index)}
                      className="opacity-0 group-hover:opacity-100">
                      <CiMenuKebab fontSize="small" />
                    </IconButton>
                    {menuIndex === index && (
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <MenuItem dense onClick={() => sortData(column, "ASC")}>
                          <ListItemIcon>
                            <ArrowUpwardOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          Sort by ASC
                        </MenuItem>
                        <MenuItem
                          dense
                          onClick={() => sortData(column, "DESC")}>
                          <ListItemIcon>
                            <ArrowDownwardOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          Sort by DESC
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          dense
                          onClick={() => handleFilterClick(index)}>
                          <ListItemIcon>
                            <FilterAltIcon fontSize="small" />
                          </ListItemIcon>
                          Filter
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          dense
                          onClick={() =>
                            setVisibleColumns(
                              visibleColumns.filter((c) => c !== column)
                            )
                          }>
                          <ListItemIcon>
                            <VisibilityOffIcon fontSize="small" />
                          </ListItemIcon>
                          Hide Column
                        </MenuItem>
                        <MenuItem dense onClick={handleManageColumnsClick}>
                          <ListItemIcon>
                            <ViewColumnIcon fontSize="small" />
                          </ListItemIcon>
                          Manage Columns
                        </MenuItem>
                      </Menu>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {finalData.map((item, index) => (
              <tr key={index} 
              className={`hover:bg-gray-100 ${index === selectedRowIndex ? 'bg-blue-100 border border-blue-500 hover:bg-blue-100' : ''}`}
              onClick={() => handleRowClickWrapper(item, index)}>
                {visibleColumns.map((column, i) => (
                  <td
                    key={i}
                    className="border border-gray-300 p-2 whitespace-nowrap"
                    // className={`whitespace-nowrap p-2  ${index === selectedRowIndex ? 'border  border-y-blue-500 border-x-gray-300' : 'border border-gray-300'} `}
                  >
                    {item[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center p-2 border-2">
        <div className="text-xs mr-5">
          <span>Rows per page:</span>
          <Select 
            className="ml-2  h-4 "
            variant="standard"
            size="small"
            value={selectedRowsPerPage}
            onChange={(e) => {
              setSelectedRowsPerPage(e.target.value);
              setCurrentPage(0);
            }}
          >
            {rowsPerPage.map((item, index) => {
              return <MenuItem key={index} value={item}>{item}</MenuItem>
            })}
            </Select>
        </div>
      <span className="text-xs mr-4">
          {/*{currentPage + 1} - {selectedRowsPerPage}  of {totalPages}*/}
          {currentPage * selectedRowsPerPage + 1} - 
          {Math.min((currentPage + 1) * selectedRowsPerPage, filteredData.length)} 
          &nbsp; of &nbsp; {filteredData.length}
    </span>
        <IconButton
          className="p-2 border rounded disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}>
          <KeyboardArrowLeftIcon fontSize="small" />
        </IconButton>
        <IconButton
          className="p-2 border rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}>
          <KeyboardArrowRightIcon fontSize="small" />
        </IconButton>
      </div>
      {filterColumnIndex !== null && (
        <PopupComponent
          ref={filterRef}
          open={enableFilterOptions}
          onClose={handlePopupClose}>
          <FilterComponent
            selectedColumn={[columnHeaders[filterColumnIndex]]}
            columns={columnsWithTypes}
            rows={rows}
            onApplyFilters = {filterData}
          />
        </PopupComponent>
      )}
      {manageColumnsOpen && (
        <PopupComponent open={manageColumnsOpen} onClose={handleClose}>
          <ManageColumnComp
            headers={columnHeaders}
            selectedHeaders={visibleColumns}
            setSelectedHeaders={setVisibleColumns}
          />
        </PopupComponent>
      )}
    </div>
  );
};

UtilityDataGrid.propTypes = {
  columnHeaders: PropTypes.arrayOf(PropTypes.string),
  pageSize: PropTypes.number,
  onRowClick: PropTypes.func.isRequired,
  rowHeight: PropTypes.number,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortingOrder: PropTypes.oneOf(["asc", "desc"]),
  sx: PropTypes.any,
  enableRowClick: PropTypes.bool,
  enableToolbar: PropTypes.bool,
  rowsPerPage : PropTypes.arrayOf(PropTypes.number)
};

export default UtilityDataGrid;
