import React from 'react';

interface ParagonStatsProps {
  usedPoints: number;
  remainingPoints: number;
}

const ParagonStats: React.FC<ParagonStatsProps> = ({ usedPoints, remainingPoints }) => {
  return (
    <div className="mb-4 flex justify-between">
      <div>
        Points: {usedPoints} Remaining: {remainingPoints}
      </div>
      <input type="text" placeholder="Search by name, stat, or keyword..." className="rounded border px-2 py-1" />
    </div>
  );
};

export default ParagonStats;
