import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import { Card as MuiCard, CardHeader, TextField } from "@mui/material";
import React, { useContext } from "react";
import CardMenu from "../cardMenu/CardMenu";
import { KanbanContext } from "../../contexts/kanbanContext/KanbanContextContainer";
import { KanbanContextActions } from "../../contexts/kanbanContext/KanbanContextActions";
import Modal from "../modal/Modal";

export const CardItem = (props) => {
  const { dispatch } = useContext(KanbanContext);
  const [openModal, setOpenModal] = React.useState(false);
  const title = props?.cards[props?.cardId]?.title;
  const description = props?.cards[props?.cardId]?.description;
  const handleMenuItemClick = (label) => {
    if (label === "Edit") {
      setOpenModal(true);
    }
    if (label === "Delete") {
      dispatch({
        type: KanbanContextActions.DELETE_CARD,
        cardId: props?.cardId,
        columnId: props?.columnId,
      });
    }
  };
  return (
    <div
      title={props?.cards[props?.cardId]?.title}
      ref={props.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
    >
      <MuiCard sx={{ minWidth: 255 }}>
        <CardHeader
          action={<CardMenu onMenuItemClick={handleMenuItemClick} />}
          title={title ? title : "Enter a title"}
        />
        <CardContent>
          <Typography variant="p">
            {description ? description : "Enter a description"}
          </Typography>
        </CardContent>
      </MuiCard>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <TextField
          label="Enter a title"
          variant="outlined"
          fullWidth
          onChange={(e) =>
            dispatch({
              type: KanbanContextActions.EDIT_CARD_TITLE,
              textValue: e.target.value,
              cardId: props?.cardId,
            })
          }
          value={title}
        />
        <TextField
          label="Enter a Description"
          variant="outlined"
          fullWidth
          onChange={(e) =>
            dispatch({
              type: KanbanContextActions.EDIT_CARD_DESCRIPTION,
              textValue: e.target.value,
              cardId: props?.cardId,
            })
          }
          value={description}
          sx={{ marginTop: 4 }}
        />
      </Modal>
    </div>
  );
};
