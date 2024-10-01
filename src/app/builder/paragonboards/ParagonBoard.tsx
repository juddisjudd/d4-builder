import React, { useState, useEffect } from 'react';
import { useBuildContext } from '@/contexts/BuildContext';
import BoardDisplay from './components/BoardDisplay';
import { loadBoardData } from './utils/boardUtils';
import { Board } from './types';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CurrentGate {
  boardId: string;
  position: 'top' | 'right' | 'bottom' | 'left';
}

const ParagonBoard: React.FC = () => {
  const { buildState } = useBuildContext();
  const [boards, setBoards] = useState<Board[]>([]);
  const [allBoards, setAllBoards] = useState<Board[]>([]);
  const [remainingPoints, setRemainingPoints] = useState(330);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGateDialogOpen, setIsGateDialogOpen] = useState(false);
  const [currentGate, setCurrentGate] = useState<CurrentGate | null>(null);

  useEffect(() => {
    const initializeBoards = async () => {
      if (buildState.selectedClass) {
        const boardData = await loadBoardData(buildState.selectedClass);
        setAllBoards(boardData);
        const startingBoard = boardData.find((board) => board.title === 'Starting Board');
        if (startingBoard) {
          setBoards([
            {
              ...startingBoard,
              selectedNodes: [],
              gates: { top: null, right: null, bottom: null, left: null },
              rotation: 0,
            },
          ]);
        }
      }
    };
    initializeBoards();
  }, [buildState.selectedClass]);

  const handleNodeSelection = (boardId: string, nodeId: string) => {
    if (remainingPoints > 0) {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardId ? { ...board, selectedNodes: [...board.selectedNodes, nodeId] } : board
        )
      );
      setRemainingPoints((prev) => prev - 1);
    }
  };

  const handleNodeDeselection = (boardId: string, nodeId: string) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId ? { ...board, selectedNodes: board.selectedNodes.filter((id) => id !== nodeId) } : board
      )
    );
    setRemainingPoints((prev) => prev + 1);
  };

  const handleGateClick = (boardId: string, gatePosition: 'top' | 'right' | 'bottom' | 'left') => {
    setIsGateDialogOpen(true);
    setCurrentGate({ boardId, position: gatePosition });
  };

  const handleBoardAttachment = (newBoard: Board) => {
    if (currentGate) {
      const { boardId, position } = currentGate;
      const oppositePosition = getOppositePosition(position);

      const updatedNewBoard: Board = {
        ...newBoard,
        selectedNodes: [],
        gates: { top: null, right: null, bottom: null, left: null, [oppositePosition]: boardId },
        rotation: 0,
        attachedTo: {
          parentId: boardId,
          position: position,
        },
      };

      setBoards((prev) => {
        const updatedBoards = prev.map((board) =>
          board.id === boardId ? { ...board, gates: { ...board.gates, [position]: updatedNewBoard.id } } : board
        );
        return [...updatedBoards, updatedNewBoard];
      });
      setIsGateDialogOpen(false);
    }
  };

  const getOppositePosition = (position: 'top' | 'right' | 'bottom' | 'left'): 'top' | 'right' | 'bottom' | 'left' => {
    switch (position) {
      case 'top':
        return 'bottom';
      case 'right':
        return 'left';
      case 'bottom':
        return 'top';
      case 'left':
        return 'right';
    }
  };

  return (
    <div className="h-full w-full">
      <div className="-mb-2 -mt-3 flex items-center justify-between p-4">
        <div>
          Points: {330 - remainingPoints} Remaining: {remainingPoints}
        </div>
        <Input
          type="text"
          placeholder="Search by name, stat, or keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
      </div>
      <div className="flex justify-center">
        <BoardDisplay
          boards={boards}
          onNodeSelect={handleNodeSelection}
          onNodeDeselect={handleNodeDeselection}
          onGateClick={handleGateClick}
          selectedClass={buildState.selectedClass || ''}
        />
      </div>
      <Dialog open={isGateDialogOpen} onOpenChange={setIsGateDialogOpen}>
        <DialogContent>
          <DialogTitle>Select a board to attach</DialogTitle>
          <div className="grid grid-cols-2 gap-4">
            {allBoards
              .filter((board) => board.title !== 'Starting Board' && !boards.some((b) => b.id === board.id))
              .map((board) => (
                <Button
                  key={board.id}
                  onClick={() => handleBoardAttachment(board)}
                  className="rounded bg-zinc-200 p-2 text-black hover:bg-zinc-300"
                >
                  {board.title}
                </Button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParagonBoard;
