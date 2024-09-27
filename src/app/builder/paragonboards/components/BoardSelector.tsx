import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Board } from '../types';

interface BoardSelectorProps {
  selectedClass: string;
  onBoardSelect: (board: Board) => void;
  availableBoards: Board[];
}

const BoardSelector: React.FC<BoardSelectorProps> = ({ selectedClass, onBoardSelect, availableBoards }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Attach New Board</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogTitle>Select a board to attach</DialogTitle>
          <div className="grid grid-cols-2 gap-4">
            {availableBoards
              .filter((board) => board.title !== 'Starting Board')
              .map((board) => (
                <Button
                  key={board.title}
                  onClick={() => {
                    onBoardSelect(board);
                    setIsOpen(false);
                  }}
                >
                  {board.title}
                </Button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BoardSelector;
