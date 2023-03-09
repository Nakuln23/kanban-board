import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from "../column/Column";
import Grid from "@mui/material/Grid/Grid";
import { Card as MuiCard, CardContent, Button } from "@mui/material";
import { KanbanContext } from "../../contexts/kanbanContext/KanbanContextContainer";
import { KanbanContextActions } from "../../contexts/kanbanContext/KanbanContextActions";

const Board = (props) => {
  const { state, dispatch } = useContext(KanbanContext);
  console.log(state, "state");

  const handleAddColumn = (event) => {
    dispatch({
      type: KanbanContextActions.ADD_COLUMN,
      event,
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
      <Grid container spacing={2}>
        {state.columns.map((column) => (
          <Column
            cards={state.cards}
            cardIds={column.cardIds}
            key={column.id}
            id={column.id}
            title={column.title}
          />
        ))}
        <Grid item xs={12} md={3}>
          <MuiCard sx={{ minWidth: 270, backgroundColor: "#EBECF0" }}>
            <CardContent>
              <Button
                onClick={handleAddColumn}
                id={props.id}
                sx={{ minWidth: 255 }}
                variant="outlined"
              >
                Add a column
              </Button>
            </CardContent>
          </MuiCard>
        </Grid>
      </Grid>
    </DragDropContext>
  );
};

export default Board;
