import React, { useEffect, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import BoardNode from './BoardNode';
import { Board, Node } from '../types';
import BoardControls from './BoardControls';

interface BoardDisplayProps {
  boards: Board[];
  onNodeSelect: (boardId: string, nodeId: string) => void;
  onNodeDeselect: (boardId: string, nodeId: string) => void;
  onGateClick: (boardId: string, gatePosition: 'top' | 'right' | 'bottom' | 'left') => void;
  selectedClass: string;
  onRotateBoard: (boardId: string) => void;
  onChangeBoard: (boardId: string) => void;
  onDeleteBoard: (boardId: string) => void;
  onClearBoard: (boardId: string) => void;
}

const BoardDisplay: React.FC<BoardDisplayProps> = ({
  boards,
  onNodeSelect,
  onNodeDeselect,
  onGateClick,
  selectedClass,
  onRotateBoard,
  onChangeBoard,
  onDeleteBoard,
  onClearBoard,
}) => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeSize = 45;
  const nodeSpacing = 6;
  const boardSize = 1201;
  const gridSize = 21;
  const gateSize = 60;

  const [rotatingBoards, setRotatingBoards] = useState<Record<string, number>>({});

  useEffect(() => {
    if (containerRef.current && transformComponentRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      const scale = Math.min(clientWidth / (boardSize * 1.2), clientHeight / (boardSize * 1.2));
      const centerX = clientWidth / 2 - (boardSize * scale) / 2;
      const centerY = clientHeight / 2 - (boardSize * scale) / 2;

      setTimeout(() => {
        transformComponentRef.current?.setTransform(centerX, centerY, scale);
      }, 100);
    }
  }, [boards]);

  const isAdjacentToSelected = (node: Node, board: Board, rotation: number) => {
    const [adjustedRow, adjustedColumn] = adjustCoordinates(node.row, node.column, rotation);
    const adjacentPositions = [
      { row: adjustedRow - 1, col: adjustedColumn },
      { row: adjustedRow + 1, col: adjustedColumn },
      { row: adjustedRow, col: adjustedColumn - 1 },
      { row: adjustedRow, col: adjustedColumn + 1 },
    ];

    return board.selectedNodes.some((selectedId) => {
      const selectedNode = board.nodes.find((n) => n.id === selectedId);
      if (selectedNode) {
        const [selectedAdjustedRow, selectedAdjustedColumn] = adjustCoordinates(
          selectedNode.row,
          selectedNode.column,
          rotation
        );
        return adjacentPositions.some((pos) => pos.row === selectedAdjustedRow && pos.col === selectedAdjustedColumn);
      }
      return false;
    });
  };

  const canSelectNode = (node: Node, board: Board, rotationAngle: number) => {
    const isStartingNode = board.title === 'Starting Board' && node.row === 15 && node.column === 11;

    if (board.selectedNodes.length === 0) {
      if (board.title === 'Starting Board') {
        const [adjustedRow, adjustedColumn] = adjustCoordinates(node.row, node.column, rotationAngle);
        return (
          (adjustedRow === 15 && adjustedColumn === 10) ||
          (adjustedRow === 14 && adjustedColumn === 11) ||
          (adjustedRow === 15 && adjustedColumn === 12)
        );
      } else {
        const connectedGate = Object.entries(board.gates).find(([_, value]) => value !== null);
        if (connectedGate) {
          const [gatePosition] = connectedGate;
          return isNodeAdjacentToGate(node, gatePosition as 'top' | 'right' | 'bottom' | 'left', rotationAngle);
        }
      }
    }

    return (
      !isStartingNode && isAdjacentToSelected(node, board, rotationAngle) && !board.selectedNodes.includes(node.id)
    );
  };

  const adjustCoordinates = (row: number, column: number, rotation: number): [number, number] => {
    switch (rotation) {
      case 90:
        return [column, gridSize + 1 - row];
      case 180:
        return [gridSize + 1 - row, gridSize + 1 - column];
      case 270:
        return [gridSize + 1 - column, row];
      default:
        return [row, column];
    }
  };

  const isNodeAdjacentToGate = (node: Node, gatePosition: 'top' | 'right' | 'bottom' | 'left', rotation: number) => {
    const [adjustedRow, adjustedColumn] = adjustCoordinates(node.row, node.column, rotation);
    switch (gatePosition) {
      case 'top':
        return adjustedRow === 2 && adjustedColumn === 11;
      case 'right':
        return adjustedRow === 11 && adjustedColumn === 20;
      case 'bottom':
        return adjustedRow === 20 && adjustedColumn === 11;
      case 'left':
        return adjustedRow === 11 && adjustedColumn === 2;
    }
  };

  const canClickGate = (board: Board, gatePosition: 'top' | 'right' | 'bottom' | 'left', rotationAngle: number) => {
    const result = board.selectedNodes.some((nodeId) => {
      const node = board.nodes.find((n) => n.id === nodeId);
      const isAdjacent = node && isNodeAdjacentToGate(node, gatePosition, rotationAngle);
      console.log(`Node ${nodeId} adjacent to ${gatePosition} gate: ${isAdjacent}`);
      return isAdjacent;
    });
    console.log(`Can click ${gatePosition} gate: ${result}`);
    return result;
  };

  const handleRotateBoard = (boardId: string) => {
    setRotatingBoards((prev) => ({
      ...prev,
      [boardId]: ((prev[boardId] || 0) + 90) % 360,
    }));

    setTimeout(() => {
      onRotateBoard(boardId);
      setRotatingBoards((prev) => {
        const { [boardId]: _, ...rest } = prev;
        return rest;
      });
    }, 300);
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
      const canClick = canClickGate(board, position, rotationAngle);

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
            transform: `rotate(${-board.rotation}deg)`,
          }}
          onClick={() => canClick && onGateClick(board.id, position)}
        />
      );
    };

    const isRotating = board.id in rotatingBoards;
    const rotationAngle = isRotating ? rotatingBoards[board.id] : board.rotation;

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
        <div
          className={`absolute bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-in-out`}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url('/images/paragon/board_bg.png')`,
            transform: `rotate(${rotationAngle}deg)`,
          }}
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
                    canSelect={canSelectNode(node, board, rotationAngle)}
                    isStartingNode={board.title === 'Starting Board' && node.row === 15 && node.column === 11}
                    selectedClass={selectedClass}
                    onSelect={() => onNodeSelect(board.id, node.id)}
                    onDeselect={() => onNodeDeselect(board.id, node.id)}
                    boardRotation={rotationAngle}
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
        {board.showControls && (
          <BoardControls
            onRotate={() => handleRotateBoard(board.id)}
            onChangeBoard={() => onChangeBoard(board.id)}
            onDeleteBoard={() => onDeleteBoard(board.id)}
            onClearBoard={() => onClearBoard(board.id)}
            canRotate={board.selectedNodes.length === 0 && !isRotating}
          />
        )}
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
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <TransformWrapper
        initialScale={1}
        minScale={0.1}
        maxScale={2}
        wheel={{ step: 0.1 }}
        limitToBounds={false}
        panning={{ velocityDisabled: true }}
      >
        {({ setTransform, ...rest }) => (
          <TransformComponent
            wrapperStyle={{ width: '100%', height: '100%' }}
            contentStyle={{ width: `${boardSize * 3}px`, height: `${boardSize * 3}px` }}
          >
            <div className="relative" style={{ width: `${boardSize * 3}px`, height: `${boardSize * 3}px` }}>
              {boards.map((board) => renderBoard(board, getBoardPosition(board)))}
            </div>
          </TransformComponent>
        )}
      </TransformWrapper>
    </div>
  );
};

export default BoardDisplay;
