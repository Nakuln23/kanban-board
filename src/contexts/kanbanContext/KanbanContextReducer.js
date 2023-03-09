import { KanbanContextActions } from "./KanbanContextActions";
import { v4 as uuidv4 } from "uuid";

export const KanbanContextInitialState = {
  columns: [],
  cards: {},
};

function KanbanContextReducer(state, action) {
  const { type, event } = action;
  const { columns, cards } = state;
  //   TODO: Add immer
  switch (type) {
    case KanbanContextActions.ON_DRAG_END: {
      if (!event.destination) {
        return state;
      }
      const dropIndex = columns.findIndex(
        (column) => column.id === event.destination.droppableId
      );
      const dropItems = Array.from(columns[dropIndex].cardIds);
      let _columns = [...columns];
      if (event.source.droppableId !== event.destination.droppableId) {
        const sourceIndex = columns.findIndex(
          (column) => column.id === event.source.droppableId
        );
        const sourceItems = Array.from(_columns[sourceIndex].cardIds);
        const [sourceSplice] = sourceItems.splice(event.source.index, 1);
        dropItems.splice(event.destination.index, 0, sourceSplice);
        _columns[dropIndex].cardIds = dropItems;
        _columns[sourceIndex].cardIds = sourceItems;
      } else {
        const [reorderedItem] = dropItems.splice(event.source.index, 1);
        dropItems.splice(event.destination.index, 0, reorderedItem);
        _columns[dropIndex].cardIds = dropItems;
      }
      return { ...state, columns: _columns };
    }
    case KanbanContextActions.ADD_COLUMN: {
      const sampleColumn = {
        id: uuidv4(),
        title: "",
        cardIds: [],
      };
      return {
        ...state,
        columns: [...columns, sampleColumn],
      };
    }
    case KanbanContextActions.ADD_COLUMN_ITEM: {
      const { columnId } = action;
      const _columns = [...columns];
      const _id = uuidv4();
      const _cards = { ...cards };
      const columnIndex = _columns.findIndex(
        (column) => column.id === columnId
      );
      _columns[columnIndex].cardIds.push(_id);
      _cards[_id] = {
        title: "",
        description: "",
      };
      return {
        ...state,
        cards: _cards,
        columns: _columns,
      };
    }
    case KanbanContextActions.EDIT_COLUMN_TITLE: {
      const { columnId, textValue } = action;
      const _columns = columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            title: textValue,
          };
        }
        return column;
      });
      return {
        ...state,
        columns: _columns,
      };
    }
    case KanbanContextActions.EDIT_CARD_TITLE: {
      const { cardId, textValue } = action;
      const _cards = { ...cards };
      _cards[cardId].title = textValue;
      return {
        ...state,
        cards: _cards,
      };
    }
    case KanbanContextActions.EDIT_CARD_DESCRIPTION: {
      const { cardId, textValue } = action;
      const _cards = { ...cards };
      _cards[cardId].description = textValue;
      return {
        ...state,
        cards: _cards,
      };
    }
    case KanbanContextActions.DELETE_CARD: {
      const { columnId, cardId } = action;
      const _columns = columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            cardIds: column?.cardIds?.filter((id) => id !== cardId),
          };
        }
        return column;
      });
      const _cards = { ...cards };
      delete _cards[cardId];
      return {
        ...state,
        columns: _columns,
        cards: _cards,
      };
    }
    case KanbanContextActions.DELETE_COLUMN: {
      const { columnId } = action;
      const cardIdsToDelete = columns?.find(
        (column) => column.id === columnId
      )?.cardIds;
      const _columns = columns.filter((column) => column.id !== columnId);
      const _cards = { ...cards };
      for (const cardId in _cards) {
        if (cardIdsToDelete.find((id) => id === cardId)) {
          delete _cards[cardId];
        }
      }
      return {
        ...state,
        columns: _columns,
        cards: _cards,
      };
    }

    default:
      return state;
  }
}

export default KanbanContextReducer;
