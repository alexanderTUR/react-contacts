import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { memo, useCallback } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { NATIONALITIES_HUMAN_NAME } from "../../../constants/nationality";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const FieldFullName = memo(({ value, onChange }) => {
  return (
    <TextField
      id="fullNameSearch"
      label="Search by full name"
      variant="outlined"
      size="small"
      name="fullName"
      value={value}
      onChange={onChange}
      sx={{ marginRight: 1, minWidth: 250 }}
    />
  );
});

const FieldGender = memo(({ value, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 150, marginRight: 1 }} size="small">
      <InputLabel id="genderLabel">Gender</InputLabel>
      <Select
        labelId="genderLabel"
        id="genderSelect"
        name="gender"
        value={value}
        label="Gender"
        onChange={onChange}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
      </Select>
    </FormControl>
  );
});

const FieldNationality = memo(({ value, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <InputLabel id="nationalityLabel">Nationality</InputLabel>
      <Select
        labelId="nationalityLabel"
        id="nationalitySelect"
        name="nationality"
        value={value}
        label="Nationality"
        onChange={onChange}
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        {Object.entries(NATIONALITIES_HUMAN_NAME).map(([key, name]) => {
          return (
            <MenuItem value={key} key={key}>
              {name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
});

export const ContactsFilters = memo(
  ({ filters, updateFilter, clearFilters }) => {
    const handleChangeFilters = useCallback(
      (event) => {
        updateFilter(event.target.name, event.target.value);
      },
      [updateFilter]
    );
    return (
      <Box
        sx={{
          display: "flex",
          marginBottom: 2,
        }}
      >
        <FieldFullName
          value={filters.fullName}
          onChange={handleChangeFilters}
        />
        <FieldGender value={filters.gender} onChange={handleChangeFilters} />
        <FieldNationality
          value={filters.nationality}
          onChange={handleChangeFilters}
        />
        <Button
          sx={{ marginLeft: "auto" }}
          size="small"
          startIcon={<ClearIcon />}
          onClick={clearFilters}
        >
          Clear
        </Button>
      </Box>
    );
  }
);

ContactsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};
