import React from 'react';
import { Job, JobStage } from '../types';
import { STAGE_COLORS, getNextStage } from '../constants';

interface JobCardProps {
  job: Job;
  onAdvance: (id: string) => void;
  onDelete: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onAdvance, onDelete }) => {
  const isCompleted = job.currentStage === JobStage.COMPLETED;
  const nextStage = getNextStage(job.currentStage, job.type);

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 flex flex-col h-full hover:shadow-md transition-all duration-150`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-mono font-bold text-gray-400">#{job.id}</span>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
          job.priority === 'Urgent' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-gray-100 text-gray-600 border border-gray-200'
        }`}>
          {job.priority}
        </span>
      </div>

      <h3 className="font-semibold text-gray-800 text-md truncate" title={job.customerName}>{job.customerName}</h3>
      {job.customerContact && (
        <p className="text-xs text-gray-500 mt-1">{job.customerContact}</p>
      )}
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{job.description}</p>

      <div className="flex justify-between items-center mt-3 text-sm">
        <span className="text-gray-500">{job.type}</span>
        <span className="text-gray-800">₹{job.price}</span>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className={`text-xs px-2 py-1 rounded font-semibold border ${STAGE_COLORS[job.currentStage]}`}>
          {job.currentStage}
        </div>
        <span className="text-xs text-gray-400">{job.assignedTo}</span>
      </div>

      <div className="flex gap-2 mt-3">
        {!isCompleted && nextStage && (
          <button 
            onClick={() => onAdvance(job.id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded transition-colors"
          >
            Move to {nextStage}
          </button>
        )}
        {isCompleted && (
          <span className="flex-1 text-center bg-green-50 text-green-600 border border-green-100 text-xs font-bold py-2 rounded">
            Completed
          </span>
        )}
        <button 
          onClick={() => onDelete(job.id)}
          className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
          title="Delete Job"
        >
          &#10005;
        </button>
      </div>
    </div>
  );
};

export default JobCard;
