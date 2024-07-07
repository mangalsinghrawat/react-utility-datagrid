import React, { useState } from 'react'
import { MockData } from '../utils/MockData'
import { CiMenuKebab } from "react-icons/ci";
import { Divider, IconButton, Menu, MenuItem, TextField } from '@mui/material';

const TestDataGrid = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuIndex, setMenuIndex] = useState(null);
    const [filters, setFilters] = useState({});

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
  
    const columnHeaders = Object.keys(MockData[0]);
    console.log({ columnHeaders })

    const handleClick = (event, index) => {
      setAnchorEl(event.currentTarget);
      setMenuIndex(index);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setMenuIndex(null);
    };

    //For Filtering Table Through Textbox 
    const handleFilterChange = (event, index) => {
        const newFilters = { ...filters, [columnHeaders[index]]: event.target.value };
        setFilters(newFilters);
      };
    
      const filteredData = MockData.filter(item => {
        return Object.keys(filters).every(key => {
          return item[key].toString().toLowerCase().includes(filters[key].toLowerCase());
        });
      });
    
    //For Sorting 
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
        }
        setSortConfig({ key, direction });
      };
    
      const sortedData = [...MockData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    
    
    //For Paginations
    const paginatedData = filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    const totalPages = Math.ceil(filteredData.length / pageSize);
   
    
  return (
    <div className='h-1/2 w-3/4 overflow-scroll border-2 ml-[15%]'>
    <div className='bg-slate-300 h-11 w-full'></div>
    <div className='flex flex-col justify-between items-center w-full px-4'>
      <table className="table-auto resize w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columnHeaders.map((header, index) => (
              <th key={index} className="border border-gray-300 p-2 relative group">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => handleSort(header)}>
                  {header}
                  {sortConfig.key === header && (
                    <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                  )}
                  <IconButton
                    onClick={(event) => handleClick(event, index)}
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <CiMenuKebab fontSize="small" />
                  </IconButton>
                  {menuIndex === index && (
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <div className="p-2">
                        <TextField
                          label="Filter"
                          variant="outlined"
                          size="small"
                          value={filters[columnHeaders[index]] || ''}
                          onChange={(event) => handleFilterChange(event, index)}
                        />
                      </div>
                    </Menu>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.EmployeeId} className="hover:bg-gray-100">
              {Object.values(item).map((value, index) => (
                <td  key={index} className="border border-gray-300 p-2 whitespace-nowrap">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
              </table>
              <div className="flex justify-between items-center p-2" >
              <button
                className="p-2 border rounded disabled:opacity-50"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              <span>Page {currentPage + 1} of {totalPages}</span>
              <button
                className="p-2 border rounded disabled:opacity-50"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
              >
                Next
              </button>
            </div>
    </div>
  
  </div>
  )
}

export default TestDataGrid



// <div className='h-1/2 w-3/4 overflow-hidden border-2 ml-[15%]'>
// <div className='bg-slate-300 h-11'></div>
// <div className='flex justify-between items-center mt-1 w-full px-4 overflow-scroll'>
//   <table className="table-auto h-40 w-full border-collapse border border-gray-300">
//     <thead className="bg-gray-100">
//       <tr>
//         {columnHeaders.map((item, index) => (
//           <th key={index} className="border border-gray-300 p-2 relative group">
//             <div className="flex items-center justify-between">
//               {item}
//               <IconButton
//                 onClick={(event) => handleClick(event, index)}
//                 className="opacity-0 group-hover:opacity-100"
//               >
//                 <CiMenuKebab fontSize="small" />
//               </IconButton>
//             </div>
//             {menuIndex === index && (
//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//                     >
//                         <MenuItem></MenuItem>
//                         <MenuItem></MenuItem>
//                         <Divider />
//                         <MenuItem></MenuItem>
//                         <Divider />
//                         <MenuItem></MenuItem>
//                         <MenuItem></MenuItem>
//                         <Divider />
//                {/* <div className="p-2">
//                   <TextField
//                     label="Filter"
//                     variant="outlined"
//                     size="small"
//                     value={filters[columnHeaders[index]] || ''}
//                     onChange={(event) => handleFilterChange(event, index)}
//                   />
//                 </div>*/}
//               </Menu>
//             )}
//           </th>
//         ))}
//       </tr>
//     </thead>
//     <tbody>
//       {filteredData.map((item) => (
//         <tr key={item.EmployeeId} className="hover:bg-gray-100">
//           {Object.values(item).map((value, index) => (
//             <td key={index} className="border border-gray-300 p-2">
//               {value}
//             </td>
//           ))}
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
// </div>




///////////////////////////////////////////////////////////--------------


// const [finalData, setFinalData] = useState(rows);
// const [currentPage, setCurrentPage] = useState(0); //For Pagination
// const [anchorEl, setAnchorEl] = useState(null);
// const [menuIndex, setMenuIndex] = useState(null);
//   const [totalPages, setTotalPages] = useState(0);
//   const [enableFilterOptions, setEnableFilterOptions] = useState(false)
//   const [filterColumnIndex, setFilterColumnIndex] = useState(null);
//   const filterRef = useRef(null);

// // const pageWiseData = rows.slice(
// //             currentPage * pageSize,
// //             (currentPage + 1) * pageSize
// // );

// const pageWiseData = (data, page, size) => {
//   const final = data.slice(page * size, (page + 1) * size);
//   setFinalData(final);
// };

// useEffect(() => {
//   setTotalPages(Math.ceil(rows.length / pageSize));
//   pageWiseData(rows, currentPage, pageSize);
// }, [rows, currentPage, pageSize]);

// const handleNextPage = () => {
//   if (currentPage < totalPages - 1) {
//     setCurrentPage((prevPage) => prevPage + 1);
//   }
// };

// const handlePreviousPage = () => {
//   if (currentPage > 0) {
//     setCurrentPage((prevPage) => prevPage - 1);
//   }
// };
// console.log(finalData);

// const handleClick = (event, index) => {
//   setAnchorEl(event.currentTarget);
//     setMenuIndex(index);
//     setFilterColumnIndex(null);
//   };
  

//   const handleFilterClick = (index) => {
//       setEnableFilterOptions(!enableFilterOptions)
//   setFilterColumnIndex(index);
//   setAnchorEl(null); // Close menu when filter is clicked
//   setMenuIndex(null);
// };

// const handlePopupClose = (event) => {
//   if (filterRef.current && !filterRef.current.contains(event.target)) {
//     setFilterColumnIndex(null);
//   }
//   setEnableFilterOptions(false)
// };
// const handleClose = () => {
//   setAnchorEl(null);
//     setMenuIndex(null);
//     setFilterColumnIndex(null);
//   };
  
//   const operators = ['is', 'is not'];

//   const sortData = (key, direction) => {
//       const sortedData = [...rows].sort((a, b) => {
//         const aValue = a[key];
//         const bValue = b[key];
    
//         // Check if the values are numbers
//         const isNumericA = !isNaN(aValue);
//         const isNumericB = !isNaN(bValue);
    
//         if (isNumericA && isNumericB) {
//           return direction === "ASC" ? aValue - bValue : bValue - aValue;
//         } else {
//           // Handle string comparison using localeCompare
//           const comparison = aValue.toString().localeCompare(bValue.toString());
//           return direction === "ASC" ? comparison : -comparison;
//         }
//       });
    
//       console.log({ sortedData });
//       setFinalData(sortedData);
//     };
    

// return (
//   <div className="">
//     {/* For Toolbar */}
//     <div className="bg-slate-300 h-11 "> </div>
//     {/* For DataGrid Table */}
//     <div className="h-[400px] overflow-scroll">
//       <table className="table-auto  w-full border-collapse border border-gray-300 ">
//         <thead className="bg-gray-100 sticky top-0 z-10">
//           <tr>
//             {columnHeaders &&
//               columnHeaders.map((column, index) => (
//                 <th
//                   className="text-sm border border-gray-300 p-2 relative group"
//                   key={index}>
//                   <div className="flex items-center justify-between cursor-pointer">
//                     {column}
//                     <IconButton
//                       onClick={(event) => handleClick(event, index)}
//                       className="opacity-0 group-hover:opacity-100">
//                       <CiMenuKebab fontSize="small" />
//                     </IconButton>
//                     {menuIndex === index && (
//                       <Menu
//                         anchorEl={anchorEl}
//                         open={Boolean(anchorEl)}
//                         onClose={handleClose}>
//                         <MenuItem dense onClick={()=> sortData(column, 'ASC')}>
//                           <ListItemIcon>
//                             <ArrowUpwardOutlinedIcon fontSize="small" />
//                           </ListItemIcon>
//                           Sort by ASC
//                         </MenuItem>
//                         <MenuItem dense onClick={()=> sortData(column, 'DESC')}>
//                           <ListItemIcon>
//                             <ArrowDownwardOutlinedIcon fontSize="small" />
//                           </ListItemIcon>
//                           Sort by DESC
//                         </MenuItem>
//                         <Divider />
//                         <MenuItem dense onClick={() => handleFilterClick(index)}>
//                           <ListItemIcon>
//                             <FilterAltIcon fontSize="small" />
//                           </ListItemIcon>
//                           Filter
//                         </MenuItem>
//                         <Divider />
//                         <MenuItem dense>
//                           <ListItemIcon>
//                             <VisibilityOffIcon fontSize="small" />
//                           </ListItemIcon>
//                           Hide Column
//                         </MenuItem>
//                         <MenuItem dense>
//                           <ListItemIcon>
//                             <ViewColumnIcon fontSize="small" />
//                           </ListItemIcon>
//                           Manage Columns
//                         </MenuItem>
//                       </Menu>
//                     )}
//                   </div>
//                 </th>
//               ))}
//           </tr>
//         </thead>
//         <tbody>
//           {finalData.map((item, index) => (
//             <tr key={index} className="hover:bg-gray-100">
//               {Object.values(item).map((value, index) => (
//                 <td
//                   key={index}
//                   className="border border-gray-300 p-2 whitespace-nowrap">
//                   {value}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     {/* For Footer */}
//     <div className="flex justify-between items-center p-2">
//       <button
//         className="p-2 border rounded disabled:opacity-50"
//         onClick={handlePreviousPage}
//         disabled={currentPage === 0}>
//         Previous
//       </button>
//       <span>
//         Page {currentPage + 1} of {totalPages}
//       </span>
//       <button
//         className="p-2 border rounded disabled:opacity-50"
//         onClick={handleNextPage}
//         disabled={currentPage >= totalPages - 1}>
//         Next
//       </button>
//         </div>
//         {filterColumnIndex !== null && (
//           <PopupComponent ref ={filterRef} open={enableFilterOptions} onClose={handlePopupClose}>
//           <FilterComponent column={[columnHeaders[filterColumnIndex]]} columns={columnHeaders} operators={operators}/>
//             </PopupComponent>
//         )}
//           </div>
    
// );
// };

// UtilityDataGrid.prototype = {
// columnHeaders: PropTypes.arrayOf(PropTypes.string),
// pageSize: PropTypes.number,
// density: PropTypes.oneOf(["compact", "comfortable"]),
// onRowClick: PropTypes.func,
// rowHeight: PropTypes.number,
// rows: PropTypes.arrayOf(PropTypes.object),
// sortingOrder: PropTypes.oneOf(["asc", "desc"]),
// sx: PropTypes.any,
// enableRowClick: PropTypes.bool,
// };