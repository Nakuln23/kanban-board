import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

const MENU_OPTIONS = [
  {
    label: "Edit",
    icon: <EditIcon />,
  },
  {
    label: "Delete",
    icon: <DeleteIcon />,
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
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {MENU_OPTIONS?.map((option) => (
          <MenuItem
            onClick={() => onMenuItemClick(option?.label)}
            key={option?.label}
          >
            <Box sx={{ marginRight: 2, display: "flex" }}>{option.icon}</Box>

            {option?.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CardMenu;
