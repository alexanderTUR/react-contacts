import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useCopyToClipboard } from "react-use";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";

const STATUS_COPY = {
  COPY: "copy",
  COPIED: "copied",
};

const TITLE_BY_STATUS = {
  [STATUS_COPY.COPY]: "Copy",
  [STATUS_COPY.COPIED]: "Copied",
};

export const CopyToClipboardText = ({ text }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY);

  const onClickCopy = useCallback(() => {
    copyToClipboard(text);
    setStatusCopy(STATUS_COPY.COPIED);
  }, [copyToClipboard, text, setStatusCopy]);

  const onMouseLeaveCopy = useCallback(() => {
    setTimeout(() => {
      setStatusCopy(STATUS_COPY.COPY);
    }, 100);
  }, [setStatusCopy]);

  return (
    <Tooltip title={TITLE_BY_STATUS[statusCopy]} placement="top" arrow>
      <Button
        variant="text"
        size="small"
        sx={{ display: "flex", alignItems: "center", textTransform: "none" }}
        onClick={onClickCopy}
        onMouseLeave={onMouseLeaveCopy}
      >
        <ContentCopyIcon fontSize={"small"} sx={{ mr: 1 }} />
        {text}
      </Button>
    </Tooltip>
  );
};

CopyToClipboardText.propTypes = {
  text: PropTypes.string.isRequired,
};
