import React from 'react';
import MinionType from './MinionType';
import bookOfTheDeadData from '../data/bookofthedead.json';

const BookOfTheDead: React.FC = () => {
  return (
    <div className="mt-8 w-full max-w-6xl">
      <div className="flex justify-between">
        {Object.entries(bookOfTheDeadData).map(([minionType, data]) => (
          <div key={minionType} className="w-1/3 px-2">
            <MinionType type={minionType} data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookOfTheDead;
