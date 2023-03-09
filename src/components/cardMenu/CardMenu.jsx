import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";

const MENU_OPTIONS = [
  {
    label: "Edit",
  },
  {
    label: "Delete",
  },
];

const CardMenu = ({ onMenuItemClick }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {MENU_OPTIONS?.map((option) => (
          <MenuItem onClick={() => onMenuItemClick(option?.label)}>
            {option?.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CardMenu;
