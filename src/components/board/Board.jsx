import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../column/Column";
import { Card as MuiCard, CardContent, Button, Box } from "@mui/material";
import { KanbanContext } from "../../contexts/kanbanContext/KanbanContextContainer";
import { KanbanContextActions } from "../../contexts/kanbanContext/KanbanContextActions";

const Board = () => {
  const { state, dispatch } = useContext(KanbanContext);

  const handleAddColumn = () => {
    dispatch({
      type: KanbanContextActions.ADD_COLUMN,
    });
  };
  const handleOnDragEnd = (event) => {
    dispatch({
      type: KanbanContextActions.ON_DRAG_END,
      event,
    });
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Box sx={{ display: "inline-flex", alignItems: "flex-start" }}>
        {state.columns.map((column) => (
          <Column
            cards={state.cards}
            cardIds={column.cardIds}
            key={column.id}
            id={column.id}
            title={column.title}
          />
        ))}
        <MuiCard sx={{ marginLeft: 8, backgroundColor: "#EBECF0" }}>
          <CardContent>
            <Button
              onClick={handleAddColumn}
              sx={{ minWidth: 255 }}
              variant="outlined"
            >
              Add a column
            </Button>
          </CardContent>
        </MuiCard>
      </Box>
    </DragDropContext>
  );
};

export default Board;
