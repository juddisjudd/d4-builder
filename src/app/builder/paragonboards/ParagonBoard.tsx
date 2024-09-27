import React, { useState, useEffect } from 'react';
import { useBuildContext } from '@/contexts/BuildContext';
import BoardDisplay from './components/BoardDisplay';
import { loadBoardData } from './utils/boardUtils';
import { Board } from './types';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface CurrentGate {
  boardId: string;
  position: 'top' | 'right' | 'bottom' | 'left';
}

const ParagonBoard: React.FC = () => {
  const { buildState } = useBuildContext();
  const [boards, setBoards] = useState<Board[]>([]);
  const [allBoards, setAllBoards] = useState<Board[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
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
          setBoards([startingBoard]);
        }
      }
    };
    initializeBoards();
  }, [buildState.selectedClass]);

  const handleNodeSelection = (nodeId: string) => {
    if (remainingPoints > 0 && !selectedNodes.includes(nodeId)) {
      setSelectedNodes((prev) => [...prev, nodeId]);
      setRemainingPoints((prev) => prev - 1);
    }
  };

  const handleGateClick = (boardId: string, gatePosition: 'top' | 'right' | 'bottom' | 'left') => {
    setIsGateDialogOpen(true);
    setCurrentGate({ boardId, position: gatePosition });
  };

  const handleBoardAttachment = (newBoard: Board) => {
    if (currentGate) {
      const updatedNewBoard: Board = {
        ...newBoard,
        attachedTo: {
          parentId: currentGate.boardId,
          position: currentGate.position,
        },
      };
      setBoards((prev) => [...prev, updatedNewBoard]);
      setIsGateDialogOpen(false);
    }
  };

  return (
    <div className="h-full w-full p-4">
      <div className="mb-4 flex items-center justify-between">
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
          selectedNodes={selectedNodes}
          onNodeSelect={handleNodeSelection}
          onGateClick={handleGateClick}
        />
      </div>
      <Dialog open={isGateDialogOpen} onOpenChange={setIsGateDialogOpen}>
        <DialogContent>
          <DialogTitle>Select a board to attach</DialogTitle>
          <div className="grid grid-cols-2 gap-4">
            {allBoards
              .filter((board) => board.title !== 'Starting Board' && !boards.includes(board))
              .map((board) => (
                <button
                  key={board.id}
                  onClick={() => handleBoardAttachment(board)}
                  className="text-black rounded bg-zinc-200 p-2 hover:bg-zinc-300"
                >
                  {board.title}
                </button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParagonBoard;
