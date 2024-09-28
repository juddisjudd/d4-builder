import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Board } from '../types';

interface BoardSelectorProps {
  selectedClass: string;
  onBoardSelect: (board: Board) => void;
  availableBoards: Board[];
}

const BoardSelector: React.FC<BoardSelectorProps> = ({ selectedClass, onBoardSelect, availableBoards }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Attach New Board</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Select a board to attach</DialogTitle>
        <div className="grid grid-cols-2 gap-4">
          {availableBoards.map((board) => (
            <Button
              key={board.id}
              onClick={() => onBoardSelect(board)}
            >
              {board.title}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoardSelector;