import React from 'react';
import { Link } from 'react-router-dom';

interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  gifUrl: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  return (
    <Link
      // to={`/exercise/${exercise.id}`}
      to='#'
      className="group block rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 bg-[#252525] group-hover:bg-[#363636] border border-gray-700"
    >
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" className="w-full h-64 object-cover" />

      <div className="flex flex-row gap-2 px-4 py-2">
        <span className="bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full capitalize">
          {exercise.bodyPart}
        </span>
        <span className="bg-red-400 text-white text-sm font-medium px-3 py-1 rounded-full capitalize">
          {exercise.target}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white px-4 pb-4 capitalize whitespace-pre-line break-words">
        {exercise.name.length > 27 ? exercise.name.slice(0, 27) + '\n' + exercise.name.slice(27) : exercise.name}
      </h3>
    </Link>
  );
};

export default ExerciseCard;
