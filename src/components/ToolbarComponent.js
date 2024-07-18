import { Badge, Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ViewColumnRoundedIcon from "@mui/icons-material/ViewColumnRounded";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import { useSelector } from "react-redux";

const ToolbarComponent = (props) => {
    const {
        // selectedColumn, columns, rows, onApplyFilters, headers, selectedHeaders, setSelectedHeaders,
        manageColumnsOpen,
        setManageColumnsOpen,
        enableFilterOptions,
        setEnableFilterOptions,
        setDensity,
        exportData
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    const filterRows = useSelector((state) => state.filter.filters);
    // const filterCount = filterRows.map(item => {
    //     let i = 0;
    //     if (item.value.length > 0 && item.value !== '') i++;
    //     return i;
    // } )
    let filterCount = 0;
    filterRows.forEach((item) => {
        if (item.value.length > 0 && item.value !== '') filterCount++;
    });
    
  console.log(filterCount);

    const handleMenuClick = (value) => {
        setDensity(value);
    };
    
    const handleExport = () => {
        
    }

  return (
    <div className="flex justify-end items-center ">
      <Button
        size="small"
        variant="text"
        startIcon={<ViewColumnRoundedIcon />}
        onClick={() => setManageColumnsOpen(!manageColumnsOpen)}>
        Manage
      </Button>
      <Button
        size="small"
        variant="text"
              startIcon={
            filterCount > 0 ?
          <Badge badgeContent={filterCount} color="primary">
            <FilterAltIcon />
          </Badge> : <FilterAltIcon />
        }
        onClick={() => setEnableFilterOptions(!enableFilterOptions)}>
        Filters
      </Button>
          <Button
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              size="small"
              variant="text" 
              startIcon={<TableRowsRoundedIcon />}
          onClick={handleClick}
          >
        Density
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <MenuItem onClick={()=>handleMenuClick('compact')}>COMPACT</MenuItem>
        <MenuItem onClick={()=>handleMenuClick('standard')}>STANDARD</MenuItem>
        <MenuItem onClick={()=>handleMenuClick('comfortable')}>COMFORTABLE</MenuItem>
      </Menu>
      <Button size="small" variant="text" startIcon={<SaveAltRoundedIcon />} onClick={handleExport}>
        EXPORT
          </Button>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <MenuItem onClick={()=>handleMenuClick('compact')}>COMPACT</MenuItem>
        <MenuItem onClick={()=>handleMenuClick('standard')}>STANDARD</MenuItem>
        <MenuItem onClick={()=>handleMenuClick('comfortable')}>COMFORTABLE</MenuItem>
      </Menu>
    </div>
  );
};

export default ToolbarComponent;
