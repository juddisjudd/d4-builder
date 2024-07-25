'use client';

import { FC } from 'react';
import { Textarea } from '@/components/ui/textarea';

const Notes: FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Notes</h2>
      <Textarea className="w-full h-64" placeholder="Add any additional notes about your build here..." />
    </div>
  );
};

export default Notes;