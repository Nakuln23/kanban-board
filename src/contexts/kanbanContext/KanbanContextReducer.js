import { KanbanContextActions } from "./KanbanContextActions";

export const KanbanContextInitialState = {
  columns: [
    { id: 1, title: "Pending", cardIds: [1] },
    {
      id: 2,
      title: "InProgess",
      cardIds: [2],
    },
    {
      id: 3,
      title: "Completed",
      cardIds: [3],
    },
  ],
  cards: {
    1: {
      title: "card 1",
      cardData: "Your Text Here",
    },
    2: {
      title: "card 2",
      cardData: "Your Text Here",
    },
    3: {
      title: "card 3",
      cardData: "Your Text Here",
    },
  },
};

function KanbanContextReducer(state, action) {
  const { type, event } = action;
  const { columns, cards } = state;
  //   TODO: Add immer
  switch (type) {
    case KanbanContextActions.ON_DRAG_END: {
      if (!event.destination) {
        return;
      }
      const dropIndex = columns.findIndex(
        (column) => column.id === parseInt(event.destination.droppableId)
      );
      const dropItems = Array.from(columns[dropIndex].cardIds);
      let _columns = [...columns];
      if (event.source.droppableId !== event.destination.droppableId) {
        const sourceIndex = columns.findIndex(
          (column) => column.id === parseInt(event.source.droppableId)
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
        id: columns.length + 1,
        title: "Enter a title",
        cardIds: [],
      };
      return {
        ...state,
        columns: [...columns, sampleColumn],
      };
    }
    case KanbanContextActions.ADD_COLUMN_ITEM: {
      const _columns = [...columns];
      const _currentHighestId = Object.keys(cards).length + 1;
      const _cards = { ...cards };
      _columns[event.target.id - 1].cardIds.push(_currentHighestId);
      _cards[_currentHighestId] = {
        title: "Enter a title",
        cardData: "Enter a description Here",
      };
      return {
        ...state,
        cards: _cards,
        columns: _columns,
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
