import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import BoardNode from './BoardNode';
import { Board, Node } from '../types';

interface BoardDisplayProps {
  boards: Board[];
  onNodeSelect: (boardId: string, nodeId: string) => void;
  onNodeDeselect: (boardId: string, nodeId: string) => void;
  onGateClick: (boardId: string, gatePosition: 'top' | 'right' | 'bottom' | 'left') => void;
  selectedClass: string;
}

const BoardDisplay: React.FC<BoardDisplayProps> = ({
  boards,
  onNodeSelect,
  onNodeDeselect,
  onGateClick,
  selectedClass,
}) => {
  const nodeSize = 45;
  const nodeSpacing = 1;
  const boardSize = 1201;
  const gridSize = 21;
  const gateSize = 60;

  const isAdjacentToSelected = (node: Node, board: Board) => {
    const adjacentPositions = [
      { row: node.row - 1, col: node.column },
      { row: node.row + 1, col: node.column },
      { row: node.row, col: node.column - 1 },
      { row: node.row, col: node.column + 1 },
    ];

    return board.selectedNodes.some((selectedId) => {
      const selectedNode = board.nodes.find((n) => n.id === selectedId);
      return (
        selectedNode && adjacentPositions.some((pos) => pos.row === selectedNode.row && pos.col === selectedNode.column)
      );
    });
  };

  const canSelectNode = (node: Node, board: Board) => {
    const isStartingNode = board.title === 'Starting Board' && node.row === 15 && node.column === 11;

    if (board.selectedNodes.length === 0) {
      if (board.title === 'Starting Board') {
        return (
          (node.row === 15 && node.column === 10) ||
          (node.row === 14 && node.column === 11) ||
          (node.row === 15 && node.column === 12)
        );
      } else {
        const connectedGate = Object.entries(board.gates).find(([_, value]) => value !== null);
        if (connectedGate) {
          const [gatePosition] = connectedGate;
          return isNodeAdjacentToGate(node, gatePosition as 'top' | 'right' | 'bottom' | 'left');
        }
      }
    }

    return !isStartingNode && isAdjacentToSelected(node, board) && !board.selectedNodes.includes(node.id);
  };

  const isNodeAdjacentToGate = (node: Node, gatePosition: 'top' | 'right' | 'bottom' | 'left') => {
    switch (gatePosition) {
      case 'top':
        return node.row === 2 && node.column === 11;
      case 'right':
        return node.row === 11 && node.column === 20;
      case 'bottom':
        return node.row === 20 && node.column === 11;
      case 'left':
        return node.row === 11 && node.column === 2;
    }
  };

  const canClickGate = (board: Board, gatePosition: 'top' | 'right' | 'bottom' | 'left') => {
    const result = board.selectedNodes.some((nodeId) => {
      const node = board.nodes.find((n) => n.id === nodeId);
      const isAdjacent = node && isNodeAdjacentToGate(node, gatePosition);
      console.log(`Node ${nodeId} adjacent to ${gatePosition} gate: ${isAdjacent}`);
      return isAdjacent;
    });
    console.log(`Can click ${gatePosition} gate: ${result}`);
    return result;
  };

  const renderBoard = (board: Board, position: { x: number; y: number }) => {
    const grid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null));

    board.nodes.forEach((node) => {
      if (node.row >= 1 && node.row <= gridSize && node.column >= 1 && node.column <= gridSize) {
        grid[node.row - 1][node.column - 1] = node;
      }
    });

    const nodeAreaSize = gridSize * (nodeSize + nodeSpacing);
    const offset = (boardSize - nodeAreaSize) / 2;

    const renderGate = (position: 'top' | 'right' | 'bottom' | 'left') => {
      if (board.title === 'Starting Board' && position !== 'top') {
        return null;
      }

      const isActive = board.gates[position] !== null;
      const canClick = canClickGate(board, position);

      const gatePositions = {
        top: { top: offset - gateSize / 2, left: boardSize / 2 - gateSize / 2 },
        right: { top: boardSize / 2 - gateSize / 2, left: boardSize - offset - gateSize / 2 },
        bottom: { top: boardSize - offset - gateSize / 2, left: boardSize / 2 - gateSize / 2 },
        left: { top: boardSize / 2 - gateSize / 2, left: offset - gateSize / 2 },
      };
      const gatePos = gatePositions[position];

      return (
        <div
          className={`absolute cursor-pointer ${!canClick && 'opacity-50'}`}
          style={{
            top: `${gatePos.top}px`,
            left: `${gatePos.left}px`,
            width: `${gateSize}px`,
            height: `${gateSize}px`,
            backgroundImage: `url('/images/paragon/nodes/${isActive ? 'gate_active' : 'gate_inactive'}.png')`,
            backgroundSize: 'cover',
            pointerEvents: canClick ? 'auto' : 'none',
          }}
          onClick={() => canClick && onGateClick(board.id, position)}
        />
      );
    };

    return (
      <div
        className="absolute bg-cover bg-center bg-no-repeat"
        style={{
          width: `${boardSize}px`,
          height: `${boardSize}px`,
          top: `${position.y}px`,
          left: `${position.x}px`,
          backgroundImage: `url('/images/paragon/board_bg.png')`,
          transform: `rotate(${board.rotation}deg)`,
        }}
        key={board.id}
      >
        {grid.map((row, rowIndex) =>
          row.map((node, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="absolute"
              style={{
                top: `${rowIndex * (nodeSize + nodeSpacing) + offset}px`,
                left: `${colIndex * (nodeSize + nodeSpacing) + offset}px`,
                width: `${nodeSize}px`,
                height: `${nodeSize}px`,
              }}
            >
              {node && (
                <BoardNode
                  node={node}
                  boardId={board.id}
                  isSelected={board.selectedNodes.includes(node.id)}
                  canSelect={canSelectNode(node, board)}
                  isStartingNode={board.title === 'Starting Board' && node.row === 15 && node.column === 11}
                  selectedClass={selectedClass}
                  onSelect={() => onNodeSelect(board.id, node.id)}
                  onDeselect={() => onNodeDeselect(board.id, node.id)}
                />
              )}
            </div>
          ))
        )}
        {renderGate('top')}
        {renderGate('right')}
        {renderGate('bottom')}
        {renderGate('left')}
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
      initialScale={1.0}
      initialPositionX={boardSize / 2}
      initialPositionY={boardSize / 2}
      minScale={0.1}
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
