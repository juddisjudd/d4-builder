import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ParagonBoardState, Board, BoardConnection } from './types';

const initialState: ParagonBoardState = {
  boards: {},
  connections: [],
  totalPoints: 330,
  usedPoints: 0,
};

type Action =
  | { type: 'ADD_BOARD'; payload: Board }
  | { type: 'REMOVE_BOARD'; payload: string }
  | { type: 'CONNECT_BOARDS'; payload: BoardConnection }
  | { type: 'SELECT_NODE'; payload: { boardId: string; nodeId: string } }
  | { type: 'DESELECT_NODE'; payload: { boardId: string; nodeId: string } }
  | { type: 'ROTATE_BOARD'; payload: { boardId: string; rotation: 0 | 90 | 180 | 270 } };

function paragonBoardReducer(state: ParagonBoardState, action: Action): ParagonBoardState {
  switch (action.type) {
    case 'ADD_BOARD':
      return { ...state, boards: { ...state.boards, [action.payload.id]: action.payload } };
    case 'REMOVE_BOARD':
      const { [action.payload]: _, ...restBoards } = state.boards;
      return {
        ...state,
        boards: restBoards,
        connections: state.connections.filter(
          (conn) => conn.sourceBoardId !== action.payload && conn.targetBoardId !== action.payload
        ),
      };
    case 'CONNECT_BOARDS':
      return {
        ...state,
        connections: [...state.connections, action.payload],
        boards: {
          ...state.boards,
          [action.payload.sourceBoardId]: {
            ...state.boards[action.payload.sourceBoardId],
            gates: {
              ...state.boards[action.payload.sourceBoardId].gates,
              [action.payload.sourceGate]: action.payload.targetBoardId,
            },
          },
          [action.payload.targetBoardId]: {
            ...state.boards[action.payload.targetBoardId],
            gates: {
              ...state.boards[action.payload.targetBoardId].gates,
              [action.payload.targetGate]: action.payload.sourceBoardId,
            },
          },
        },
      };
    case 'SELECT_NODE':
      if (state.usedPoints < state.totalPoints) {
        const board = state.boards[action.payload.boardId];
        return {
          ...state,
          boards: {
            ...state.boards,
            [action.payload.boardId]: {
              ...board,
              selectedNodes: [...board.selectedNodes, action.payload.nodeId],
            },
          },
          usedPoints: state.usedPoints + 1,
        };
      }
      return state;
    case 'DESELECT_NODE':
      const board = state.boards[action.payload.boardId];
      const nodeIndex = board.selectedNodes.indexOf(action.payload.nodeId);
      if (nodeIndex !== -1) {
        return {
          ...state,
          boards: {
            ...state.boards,
            [action.payload.boardId]: {
              ...board,
              selectedNodes: board.selectedNodes.filter((_, i) => i !== nodeIndex),
            },
          },
          usedPoints: state.usedPoints - 1,
        };
      }
      return state;
    case 'ROTATE_BOARD':
      return {
        ...state,
        boards: {
          ...state.boards,
          [action.payload.boardId]: {
            ...state.boards[action.payload.boardId],
            rotation: action.payload.rotation,
          },
        },
      };
    default:
      return state;
  }
}

const ParagonBoardContext = createContext<
  | {
      state: ParagonBoardState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export const ParagonBoardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(paragonBoardReducer, initialState);
  return <ParagonBoardContext.Provider value={{ state, dispatch }}>{children}</ParagonBoardContext.Provider>;
};

export const useParagonBoard = () => {
  const context = useContext(ParagonBoardContext);
  if (context === undefined) {
    throw new Error('useParagonBoard must be used within a ParagonBoardProvider');
  }
  return context;
};
