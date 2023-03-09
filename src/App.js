import React from "react";
import Board from "./components/board/Board";
import KanbanContextContainer from "./contexts/kanbanContext/KanbanContextContainer";

function App() {
  return (
    <div className="App">
      <h1> Kanban Board </h1>
      <KanbanContextContainer>
        <Board />
      </KanbanContextContainer>
    </div>
  );
}

export default App;
