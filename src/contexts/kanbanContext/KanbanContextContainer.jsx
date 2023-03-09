import React, { createContext, useReducer } from "react";
import KanbanContextReducer, {
  KanbanContextInitialState,
} from "./KanbanContextReducer";

export const KanbanContext = createContext(null);

const KanbanContextContainer = ({ children }) => {
  const [state, dispatch] = useReducer(
    KanbanContextReducer,
    KanbanContextInitialState
  );
  return (
    <KanbanContext.Provider value={{ state, dispatch }}>
      {children}
    </KanbanContext.Provider>
  );
};

export default KanbanContextContainer;
