import React, { useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import { CardItem } from "../card/CardItem";
import {
  Card as MuiCard,
  CardContent,
  Button,
  CardHeader,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import CardMenu from "../cardMenu/CardMenu";
import { KanbanContext } from "../../contexts/kanbanContext/KanbanContextContainer";
import { KanbanContextActions } from "../../contexts/kanbanContext/KanbanContextActions";
import Modal from "../modal/Modal";

export const Column = ({ cards, id, cardIds, title }) => {
  const { dispatch } = useContext(KanbanContext);
  const [openModal, setOpenModal] = React.useState(false);
  const handleTextArea = (e) => {
    dispatch({
      type: KanbanContextActions.EDIT_COLUMN_TITLE,
      textValue: e.target.value,
      columnId: id,
    });
  };
  const handleAddButton = () => {
    dispatch({
      type: KanbanContextActions.ADD_COLUMN_ITEM,
      columnId: id,
    });
  };
  const handleMenuItemClick = (label) => {
    if (label === "Edit") {
      setOpenModal(true);
    }
    if (label === "Delete") {
      dispatch({
        type: KanbanContextActions.DELETE_COLUMN,
        columnId: id,
      });
    }
  };
  return (
    <MuiCard sx={{ backgroundColor: "#EBECF0", marginLeft: 8 }}>
      <CardHeader
        action={<CardMenu onMenuItemClick={handleMenuItemClick} />}
        title={
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5">
              {title ? title : "Enter a title"}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Droppable droppableId={id}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <List>
                <ListItem>
                  <Button
                    onClick={handleAddButton}
                    id={id}
                    sx={{ minWidth: 255 }}
                    variant="outlined"
                  >
                    Add a item
                  </Button>
                </ListItem>
                {cardIds.map((cardId, index) => (
                  <Draggable
                    key={cardId}
                    draggableId={`${cardId}`}
                    index={index}
                  >
                    {(provided) => (
                      <ListItem>
                        <CardItem
                          provided={provided}
                          innerRef={provided.innerRef}
                          handleTextArea={handleTextArea}
                          cards={cards}
                          cardId={cardId}
                          columnId={id}
                        />
                      </ListItem>
                    )}
                  </Draggable>
                ))}
              </List>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardContent>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <TextField
          label="Enter a title"
          variant="outlined"
          fullWidth
          onChange={handleTextArea}
          value={title}
        />
      </Modal>
    </MuiCard>
  );
};
