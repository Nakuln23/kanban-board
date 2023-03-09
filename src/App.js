import React from "react";
import Board from "./components/board/Board";
import KanbanContextContainer from "./contexts/kanbanContext/KanbanContextContainer";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Box sx={{ display: "flex", justifyContent: "center", margin: 4 }}>
        <Typography variant="h4">Kanban Board</Typography>
      </Box>
      <KanbanContextContainer>
        <Board />
      </KanbanContextContainer>
    </div>
  );
}

export default App;
