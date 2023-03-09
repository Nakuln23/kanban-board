import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import { Card as MuiCard, CardHeader, TextField } from "@mui/material";
import React, { useContext } from "react";
import CardMenu from "../cardMenu/CardMenu";
import { KanbanContext } from "../../contexts/kanbanContext/KanbanContextContainer";
import { KanbanContextActions } from "../../contexts/kanbanContext/KanbanContextActions";
import Modal from "../modal/Modal";

// TODO : Add Proptypes
export const CardItem = ({ cards, cardId, columnId, innerRef, provided }) => {
  const { dispatch } = useContext(KanbanContext);
  const [openModal, setOpenModal] = React.useState(false);
  const title = cards[cardId]?.title;
  const description = cards[cardId]?.description;
  const handleMenuItemClick = (label) => {
    if (label === "Edit") {
      setOpenModal(true);
    }
    if (label === "Delete") {
      dispatch({
        type: KanbanContextActions.DELETE_CARD,
        cardId: cardId,
        columnId: columnId,
      });
    }
  };
  return (
    <div
      title={cards[cardId]?.title}
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
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
              cardId: cardId,
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
              cardId: cardId,
            })
          }
          value={description}
          sx={{ marginTop: 4 }}
          rows={4}
        />
      </Modal>
    </div>
  );
};
