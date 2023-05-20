import React from "react";
import SearchIcon from "mdi-material-ui/Magnify";
import { TextField, InputAdornment } from "@mui/material";

const SearchBar = ({ placeholder, onSearch }) => {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <TextField
      sx={{ width: "100%" }}
      placeholder={placeholder}
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
