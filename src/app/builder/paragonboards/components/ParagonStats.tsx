import React from 'react';

interface ParagonStatsProps {
  usedPoints: number;
  remainingPoints: number;
}

const ParagonStats: React.FC<ParagonStatsProps> = ({ usedPoints, remainingPoints }) => {
  return (
    <div className="mb-4 flex justify-between items-center">
      <div>
        <span className="font-bold">Points Used:</span> {usedPoints}
      </div>
      <div>
        <span className="font-bold">Points Remaining:</span> {remainingPoints}
      </div>
    </div>
  );
};

export default ParagonStats;