import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import BoardNode from './BoardNode';
import { Board, Node } from '../types';

interface BoardDisplayProps {
  boards: Board[];
  selectedNodes: string[];
  onNodeSelect: (nodeId: string) => void;
  onGateClick: (boardId: string, gatePosition: 'top' | 'right' | 'bottom' | 'left') => void;
}

const BoardDisplay: React.FC<BoardDisplayProps> = ({ boards, selectedNodes, onNodeSelect, onGateClick }) => {
  const nodeSize = 30;
  const nodeSpacing = 2;
  const boardSize = 21 * (nodeSize + nodeSpacing);

  const renderBoard = (board: Board, position: { x: number; y: number }) => {
    const grid = Array(21)
      .fill(null)
      .map(() => Array(21).fill(null));

    board.nodes.forEach((node) => {
      if (node.row >= 1 && node.row <= 21 && node.column >= 1 && node.column <= 21) {
        grid[node.row - 1][node.column - 1] = node;
      }
    });

    const isAdjacentToSelected = (node: Node) => {
      const adjacentPositions = [
        { row: node.row - 1, col: node.column },
        { row: node.row + 1, col: node.column },
        { row: node.row, col: node.column - 1 },
        { row: node.row, col: node.column + 1 },
      ];

      return selectedNodes.some((selectedId) => {
        const selectedNode = boards.flatMap((b) => b.nodes).find((n) => n.id === selectedId);
        return (
          selectedNode &&
          adjacentPositions.some((pos) => pos.row === selectedNode.row && pos.col === selectedNode.column)
        );
      });
    };

    const canSelectNode = (node: Node) => {
      if (selectedNodes.length === 0) {
        if (board.title === 'Starting Board') {
          return (
            (node.row === 15 && node.column === 10) ||
            (node.row === 14 && node.column === 11) ||
            (node.row === 15 && node.column === 12)
          );
        } else {
          const gatePosition = board.attachedTo?.position;
          switch (gatePosition) {
            case 'top':
              return node.row === 1 && node.column === 11;
            case 'right':
              return node.row === 11 && node.column === 20;
            case 'bottom':
              return node.row === 20 && node.column === 11;
            case 'left':
              return node.row === 11 && node.column === 1;
            default:
              return false;
          }
        }
      }
      return isAdjacentToSelected(node) && !selectedNodes.includes(node.id);
    };

    const renderGate = (row: number, col: number, position: 'top' | 'right' | 'bottom' | 'left') => {
      if (board.title === 'Starting Board' && position !== 'top') {
        return null;
      }
      return (
        <div
          className="absolute flex cursor-pointer items-center justify-center rounded-full bg-red-700 text-xs text-white"
          style={{
            top: `${row * (nodeSize + nodeSpacing)}px`,
            left: `${col * (nodeSize + nodeSpacing)}px`,
            width: `${nodeSize}px`,
            height: `${nodeSize}px`,
          }}
          onClick={() => onGateClick(board.id, position)}
        >
          <svg
            fill="#000000"
            width="24px"
            height="24px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M26.332 27.364v-25.951h-20.881v25.951h-0.476l1.905 3.622 1.905-3.622h-1.075v-3.962h2.442v3.962h-0.445l1.905 3.622 1.905-3.622h-1.106v-3.962h2.296v3.962h-0.356l1.905 3.622 1.905-3.622h-1.159v-3.962h2.478v3.962h-0.435l1.905 3.622 1.905-3.622h-1.116v-3.962h2.332v3.962h-0.382l1.905 3.622 1.905-3.622h-1.17zM12.411 10.178h2.296v4.344h-2.296v-4.344zM10.151 14.522h-2.442v-4.344h2.442v4.344zM17.003 10.178h2.478v4.344h-2.478v-4.344zM21.74 10.178h2.332v4.344h-2.332v-4.344zM24.072 3.651v4.259h-2.332v-4.259h2.332zM19.481 3.651v4.259h-2.478v-4.259h2.478zM14.707 3.651v4.259h-2.296v-4.259h2.296zM10.151 3.651v4.259h-2.442v-4.259h2.442zM7.71 21.134v-4.345h2.442v4.345h-2.442zM12.411 21.134v-4.345h2.296v4.345h-2.296zM17.003 21.134v-4.345h2.478v4.345h-2.478zM21.74 21.134v-4.345h2.332v4.345h-2.332z" />
          </svg>
        </div>
      );
    };

    return (
      <div
        className="absolute"
        style={{
          width: `${boardSize}px`,
          height: `${boardSize}px`,
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
        key={board.id}
      >
        {grid.map((row, rowIndex) =>
          row.map((node, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="absolute"
              style={{
                top: `${rowIndex * (nodeSize + nodeSpacing)}px`,
                left: `${colIndex * (nodeSize + nodeSpacing)}px`,
                width: `${nodeSize}px`,
                height: `${nodeSize}px`,
              }}
            >
              {node && (
                <BoardNode
                  node={node}
                  isSelected={selectedNodes.includes(node.id)}
                  onSelect={() => onNodeSelect(node.id)}
                  canSelect={canSelectNode(node)}
                  isAdjacent={isAdjacentToSelected(node)}
                />
              )}
            </div>
          ))
        )}
        {renderGate(0, 10, 'top')}
        {renderGate(10, 20, 'right')}
        {renderGate(20, 10, 'bottom')}
        {renderGate(10, 0, 'left')}
      </div>
    );
  };

  const getBoardPosition = (board: Board): { x: number; y: number } => {
    if (board.title === 'Starting Board') {
      return { x: 0, y: 0 };
    }
    const parentBoard = boards.find((b) => b.id === board.attachedTo?.parentId);
    if (!parentBoard) return { x: 0, y: 0 };

    const parentPos = getBoardPosition(parentBoard);
    switch (board.attachedTo?.position) {
      case 'top':
        return { x: parentPos.x, y: parentPos.y - boardSize };
      case 'right':
        return { x: parentPos.x + boardSize, y: parentPos.y };
      case 'bottom':
        return { x: parentPos.x, y: parentPos.y + boardSize };
      case 'left':
        return { x: parentPos.x - boardSize, y: parentPos.y };
      default:
        return { x: 0, y: 0 };
    }
  };

  return (
    <TransformWrapper
      initialScale={1.5}
      initialPositionX={100}
      initialPositionY={10}
      minScale={0.2}
      maxScale={2}
      wheel={{ step: 0.1 }}
      limitToBounds={false}
    >
      <TransformComponent>
        <div className="relative" style={{ width: `${boardSize * 3}px`, height: `${boardSize * 3}px` }}>
          {boards.map((board) => renderBoard(board, getBoardPosition(board)))}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default BoardDisplay;
