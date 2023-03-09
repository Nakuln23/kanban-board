import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Modal as MuiModal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Modal({ open, onClose, children }) {
  return (
    <div>
      <MuiModal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box sx={style}>
            {children}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{ marginTop: 4 }}
              >
                Done
              </Button>
            </Box>
          </Box>
        </>
      </MuiModal>
    </div>
  );
}
