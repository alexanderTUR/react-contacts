import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { NATIONALITIES_HUMAN_NAME } from "../../../constants/nationality";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

export const ContactsFilters = ({ filters, updateFilter, clearFilters }) => {
  const handleChangeFilters = (event) => {
    updateFilter(event.target.name, event.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        marginBottom: 2,
      }}
    >
      <TextField
        id="fullNameSearch"
        label="Search by full name"
        variant="outlined"
        size="small"
        name="fullName"
        value={filters.fullName}
        onChange={handleChangeFilters}
        sx={{ marginRight: 1, minWidth: 250 }}
      />
      <FormControl sx={{ minWidth: 150, marginRight: 1 }} size="small">
        <InputLabel id="genderLabel">Gender</InputLabel>
        <Select
          labelId="genderLabel"
          id="genderSelect"
          name="gender"
          value={filters.gender}
          label="Gender"
          onChange={handleChangeFilters}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 150 }} size="small">
        <InputLabel id="nationalityLabel">Nationality</InputLabel>
        <Select
          labelId="nationalityLabel"
          id="nationalitySelect"
          name="nationality"
          value={filters.nationality}
          label="Nationality"
          onChange={handleChangeFilters}
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
};

ContactsFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};
