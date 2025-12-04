import React, { useState } from 'react';
import { Job } from '../types';
import JobCard from './JobCard';

interface JobBoardProps {
  jobs: Job[];
  onAdvance: (id: string) => void;
  onDelete: (id: string) => void;
}

const JobBoard: React.FC<JobBoardProps> = ({ jobs, onAdvance, onDelete }) => {
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');

  const filteredJobs = jobs.filter(job => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return job.currentStage !== 'COMPLETED';
    if (filter === 'Completed') return job.currentStage === 'COMPLETED';
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {['All', 'Pending', 'Completed'].map(f => (
          <button
            key={f}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setFilter(f as any)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredJobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onAdvance={onAdvance} 
            onDelete={onDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default JobBoard;
