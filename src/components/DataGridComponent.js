import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
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

const UtilityDataGrid = (props) => {
  const {
    pageSize = "10",
    columnHeaders,
    classes,
    density,
    onRowClick,
    rowHeight,
    rows,
    sortingOrder,
    sx,
    enableRowClick = false,
  } = props;
  const [finalData, setFinalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [enableFilterOptions, setEnableFilterOptions] = useState(false);
  const [filterColumnIndex, setFilterColumnIndex] = useState(null);
  const filterRef = useRef(null);

  useEffect(() => {
    setTotalPages(Math.ceil(rows.length / pageSize));
    setFinalData(rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize));
  }, [rows, currentPage, pageSize]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(prevPage => prevPage - 1);
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
    setFilterColumnIndex(null);
  };

  const handleFilterClick = index => {
    setEnableFilterOptions(!enableFilterOptions);
    setFilterColumnIndex(index);
    setAnchorEl(null);
    setMenuIndex(null);
  };

  const handlePopupClose = event => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setFilterColumnIndex(null);
      setEnableFilterOptions(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
    setFilterColumnIndex(null);
  };

  const sortData = (key, direction) => {
    const sortedData = [...rows].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (!isNaN(aValue) && !isNaN(bValue)) {
        return direction === 'ASC' ? aValue - bValue : bValue - aValue;
      } else {
        const comparison = aValue.toString().localeCompare(bValue.toString());
        return direction === 'ASC' ? comparison : -comparison;
      }
    });

    setFinalData(sortedData);
  };

  const operators = ['is', 'is not'];

  return (
    <div>
      <div className="bg-slate-300 h-11"></div>
      <div className="h-[400px] overflow-scroll">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {columnHeaders?.map((column, index) => (
                <th key={index} className="text-sm border border-gray-300 p-2 relative group">
                  <div className="flex items-center justify-between cursor-pointer">
                    {column}
                    <IconButton onClick={event => handleClick(event, index)} className="opacity-0 group-hover:opacity-100">
                      <CiMenuKebab fontSize="small" />
                    </IconButton>
                    {menuIndex === index && (
                      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem dense onClick={() => sortData(column, 'ASC')}>
                          <ListItemIcon>
                            <ArrowUpwardOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          Sort by ASC
                        </MenuItem>
                        <MenuItem dense onClick={() => sortData(column, 'DESC')}>
                          <ListItemIcon>
                            <ArrowDownwardOutlinedIcon fontSize="small" />
                          </ListItemIcon>
                          Sort by DESC
                        </MenuItem>
                        <Divider />
                        <MenuItem dense onClick={() => handleFilterClick(index)}>
                          <ListItemIcon>
                            <FilterAltIcon fontSize="small" />
                          </ListItemIcon>
                          Filter
                        </MenuItem>
                        <Divider />
                        <MenuItem dense>
                          <ListItemIcon>
                            <VisibilityOffIcon fontSize="small" />
                          </ListItemIcon>
                          Hide Column
                        </MenuItem>
                        <MenuItem dense>
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
            {finalData.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {Object.values(item).map((value, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 p-2 whitespace-nowrap">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-2">
        <button className="p-2 border rounded disabled:opacity-50" onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button className="p-2 border rounded disabled:opacity-50" onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
          Next
        </button>
      </div>
      {filterColumnIndex !== null && (
        <PopupComponent ref={filterRef} open={enableFilterOptions} onClose={handlePopupClose}>
          <FilterComponent column={[columnHeaders[filterColumnIndex]]} columns={columnHeaders} operators={operators} />
        </PopupComponent>
      )}
    </div>
  );
};

UtilityDataGrid.propTypes = {
  columnHeaders: PropTypes.arrayOf(PropTypes.string),
  pageSize: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
  rows: PropTypes.arrayOf(PropTypes.object),
  sortingOrder: PropTypes.oneOf(['asc', 'desc']),
  sx: PropTypes.any,
  enableRowClick: PropTypes.bool
};

export default UtilityDataGrid;

// <tbody>
//                   {rows && rows.map((row, index) => (
//                       <tr key={index} onClick={() => onRowClick(row)}>
//                           {row && row.map((cell, index) => (
//                               <td key={index}>{cell}</td>
//                           ))}
//                       </tr>
//                   ))}
//               </tbody>

///

// <th
// className="text-sm border border-gray-300 p-2 relative group"
// key={index}>
// {column}
// <div className="absolute bg-black top-0 right-0 hidden group-hover:block">
//   <IconButton
//     onClick={(event) => handleClick(event, index)}
//     className="opacity-0 group-hover:opacity-100">
//     <CiMenuKebab fontSize="small" />
//   </IconButton>
//         {menuIndex === index && (
//             <Paper >
//             <MenuList
//                 dense
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}>
//                 <MenuItem>
//                 <ListItemIcon>
//                  <FaArrowUp / >
//                 </ListItemIcon>
//                 Sort by ASC
//               </MenuItem>
//               <MenuItem>
//                 <ListItemIcon>
//                  <FaArrowDown / >
//                 </ListItemIcon>
//                 Sort by DESC
//               </MenuItem>
//               <Divider />
//                 </MenuList>
//                 </Paper>
//   )}
// </div>
// </th>
