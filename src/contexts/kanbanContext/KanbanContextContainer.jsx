import React, { createContext, useReducer, useMemo } from "react";
import KanbanContextReducer, {
  KanbanContextInitialState,
} from "./KanbanContextReducer";

export const KanbanContext = createContext(null);

const KanbanContextContainer = ({ children }) => {
  const [state, dispatch] = useReducer(
    KanbanContextReducer,
    KanbanContextInitialState
  );
  const kanbanContextValue = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state]);
  return (
    <KanbanContext.Provider value={kanbanContextValue}>
      {children}
    </KanbanContext.Provider>
  );
};

export default KanbanContextContainer;
