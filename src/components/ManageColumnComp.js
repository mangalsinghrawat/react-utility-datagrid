import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
  styled,
} from "@mui/material";

const ManageColumnComp = ({ headers, selectedHeaders, setSelectedHeaders }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHeaders, setFilteredHeaders] = useState(headers);

  const SmallFontFormControlLabel = styled(FormControlLabel)({
    "& .MuiFormControlLabel-label": {
      fontSize: "0.9rem",
      fontWeight: 400,
    },
  });
  useEffect(() => {
    setFilteredHeaders(
      headers.filter((header) =>
        header.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, headers]);

  const handleToggle = (header) => {
    const currentIndex = selectedHeaders.indexOf(header);
    const newChecked = [...selectedHeaders];
    if (currentIndex === -1) {
      const previousIndex = headers.indexOf(header);
      newChecked.splice(previousIndex, 0, header);
      //   newChecked.push(header);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedHeaders(newChecked);
  };

  console.log({ selectedHeaders });
  const handleSelectAllToggle = (event) => {
    if (event.target.checked) {
      setSelectedHeaders(headers);
    } else {
      setSelectedHeaders([]);
    }
  };

  return (
    <div className="w-[200px]">
      <FormControl sx={{ maxHeight: 400 }} fullWidth>
        <TextField
          variant="outlined"
          label="Search"
          size="small"
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormGroup
          sx={{
            maxHeight: "300px",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "row",
          }}>
          {filteredHeaders.map((header) => (
            <SmallFontFormControlLabel
              sx={{ width: "210px" }}
              key={header}
              control={
                <Checkbox
                  size="small"
                  checked={selectedHeaders.indexOf(header) !== -1}
                  onChange={() => handleToggle(header)}
                />
              }
              label={header}
            />
          ))}
        </FormGroup>

        <Divider />
        <SmallFontFormControlLabel
          control={
            <Checkbox
              size="small"
              checked={selectedHeaders.length === headers.length}
              indeterminate={
                selectedHeaders.length > 0 &&
                selectedHeaders.length < headers.length
              }
              onChange={handleSelectAllToggle}
            />
          }
          label="Show/Hide All"
        />
      </FormControl>
    </div>
  );
};

export default ManageColumnComp;
