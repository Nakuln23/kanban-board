import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import { Card as MuiCard, CardHeader } from "@mui/material";
import React, { useContext } from "react";
import CardMenu from "../cardMenu/CardMenu";
import { KanbanContext } from "../../contexts/kanbanContext/KanbanContextContainer";
import { KanbanContextActions } from "../../contexts/kanbanContext/KanbanContextActions";

export const CardItem = (props) => {
  const { dispatch } = useContext(KanbanContext);
  const onMenuItemClick = (label) => {
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
          action={<CardMenu onMenuItemClick={onMenuItemClick} />}
          title={props?.cards[props?.cardId]?.title}
        />
        <CardContent>
          <Typography variant="p">
            {props?.cards[props?.cardId]?.cardData}
          </Typography>
        </CardContent>
      </MuiCard>
    </div>
  );
};
