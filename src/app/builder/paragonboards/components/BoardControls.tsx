import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, ArrowLeftRight, Trash, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BoardControlsProps {
  onRotate: () => void;
  onChangeBoard: () => void;
  onDeleteBoard: () => void;
  onClearBoard: () => void;
  canRotate: boolean;
}

const BoardControls: React.FC<BoardControlsProps> = ({
  onRotate,
  onChangeBoard,
  onDeleteBoard,
  onClearBoard,
  canRotate,
}) => {
  return (
    <TooltipProvider>
      <div className="absolute right-4 top-4 flex space-x-2">
        <Tooltip>
          <TooltipTrigger>
            <Button onClick={onRotate} disabled={!canRotate} size="sm">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rotate</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button onClick={onChangeBoard} size="sm">
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Change Board</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button onClick={onClearBoard} size="sm">
              <X className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear Nodes</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button onClick={onDeleteBoard} size="sm" variant="destructive">
              <Trash className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Board</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default BoardControls;
