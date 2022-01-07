import { useEffect, useState } from "react";
import { VIEW_MODES } from "../../constants/viewmodes";

const getInitialDataViewMode = () => {
  return localStorage.getItem("dataViewMode") || VIEW_MODES.TABLE;
};

export const useDataViewMode = () => {
  const [dataViewMode, setDataViewMode] = useState(getInitialDataViewMode);

  useEffect(() => {
    localStorage.setItem("dataViewMode", dataViewMode);
  }, [dataViewMode]);

  return [dataViewMode, setDataViewMode];
};
