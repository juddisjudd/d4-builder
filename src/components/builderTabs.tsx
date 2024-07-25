'use client';

import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hammer, Book, Diamond, NotebookText, Youtube, ChartBar } from 'lucide-react';
import Notes from '@/app/builder/Notes';
import Showcase from '@/app/builder/Showcase';
import Aspects from '@/app/builder/gear/Aspects';
import GemSection from '@/app/builder/gear/Gems';

interface BuilderTabsProps {
  selectedClass: string | null;
}

const BuilderTabs: FC<BuilderTabsProps> = ({ selectedClass }) => {
  return (
    <Tabs defaultValue="gear-skills" className="mt-4">
      <TabsList className="flex space-x-4">
        <TabsTrigger value="gear-skills" className="flex items-center space-x-1">
          <Hammer className="w-4 h-4" />
          <span>Gear & Skills</span>
        </TabsTrigger>
        <TabsTrigger value="skill-tree" className="flex items-center space-x-1">
          <Book className="w-4 h-4" />
          <span>Skill Tree</span>
        </TabsTrigger>
        <TabsTrigger value="paragon" className="flex items-center space-x-1">
          <Diamond className="w-4 h-4" />
          <span>Paragon</span>
        </TabsTrigger>
        <TabsTrigger value="notes" className="flex items-center space-x-1">
          <NotebookText className="w-4 h-4" />
          <span>Notes</span>
        </TabsTrigger>
        <TabsTrigger value="showcase" className="flex items-center space-x-1">
          <Youtube className="w-4 h-4" />
          <span>Showcase</span>
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center space-x-1">
          <ChartBar className="w-4 h-4" />
          <span>Stats</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="gear-skills">
        <Aspects selectedClass={selectedClass} />
        <GemSection selectedClass={selectedClass} />
      </TabsContent>
      <TabsContent value="skill-tree">
        <div>Content specific to Skill Tree for {selectedClass}</div>
      </TabsContent>
      <TabsContent value="paragon">
        <div>Content specific to Paragon for {selectedClass}</div>
      </TabsContent>
      <TabsContent value="notes">
        <Notes />
      </TabsContent>
      <TabsContent value="showcase">
        <Showcase />
      </TabsContent>
      <TabsContent value="stats">
        <div>Content specific to Stats for {selectedClass}</div>
      </TabsContent>
    </Tabs>
  );
};

export default BuilderTabs;
