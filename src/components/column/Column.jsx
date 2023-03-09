import React, { useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Grid from "@mui/material/Grid/Grid";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import { CardItem } from "../card/CardItem";
import {
  Card as MuiCard,
  CardContent,
  Button,
  CardHeader,
} from "@mui/material";
import CardMenu from "../cardMenu/CardMenu";
import { KanbanContext } from "../../contexts/kanbanContext/KanbanContextContainer";
import { KanbanContextActions } from "../../contexts/kanbanContext/KanbanContextActions";

export const Column = (props) => {
  const { dispatch } = useContext(KanbanContext);
  const handleTextArea = () => {};
  const handleAddButton = (event) => {
    dispatch({
      type: KanbanContextActions.ADD_COLUMN_ITEM,
      event,
    });
  };
  const handleMenuItemClick = (label) => {
    if (label === "Delete") {
      dispatch({
        type: KanbanContextActions.DELETE_COLUMN,
        columnId: props?.id,
      });
    }
  };
  return (
    <Grid item xs={12} md={3}>
      <MuiCard sx={{ minWidth: 270, backgroundColor: "#EBECF0" }}>
        <CardHeader
          action={<CardMenu onMenuItemClick={handleMenuItemClick} />}
          title={props.title}
        />
        <CardContent>
          <Droppable droppableId={props.id?.toString()}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <List>
                  {props.cardIds.map((cardId, index) => (
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
                            cards={props.cards}
                            cardId={cardId}
                            columnId={props.id}
                          />
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  <ListItem>
                    <Button
                      onClick={handleAddButton}
                      id={props.id}
                      sx={{ minWidth: 255 }}
                      variant="outlined"
                    >
                      Add a item
                    </Button>
                  </ListItem>
                </List>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardContent>
      </MuiCard>
    </Grid>
  );
};
