import { useCallback } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { VIEW_MODES } from "../../../constants/viewmodes";
import PropTypes from "prop-types";

export const ToggleDataViewMode = ({ dataViewMode, setDataViewMode }) => {
  const handleChangeViewMode = useCallback(
    (_, nextView) => {
      setDataViewMode(nextView);
    },
    [setDataViewMode]
  );

  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={dataViewMode}
      exclusive
      onChange={handleChangeViewMode}
    >
      <ToggleButton
        value={VIEW_MODES.TABLE}
        aria-label={VIEW_MODES.TABLE}
        data-testid="toggle-data-view-mode-table"
      >
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton
        value={VIEW_MODES.GRID}
        aria-label={VIEW_MODES.GRID}
        data-testid="toggle-data-view-mode-grid"
      >
        <ViewModuleIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

ToggleDataViewMode.propTypes = {
  dataViewMode: PropTypes.oneOf([VIEW_MODES.TABLE, VIEW_MODES.GRID]).isRequired,
  setDataViewMode: PropTypes.func.isRequired,
};
