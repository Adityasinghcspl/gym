import React, { useEffect, useState } from 'react';
import ExerciseCard from './ExerciseCard';
import { exerciseOptions, fetchData } from '../../utils/fetchData';

interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
  gifUrl: string;
}

interface ExercisesProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  bodyPart: string;
}

const Exercises: React.FC<ExercisesProps> = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);
  const exercisesPerPage = 9;

  useEffect(() => {
    const fetchExerciseData = async () => {
      let exercisesData: Exercise[] = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData<Exercise[]>(
          'https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData<Exercise[]>(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }

      setExercises(exercisesData);
    };

    fetchExerciseData();
  }, [bodyPart, setExercises]);

  useEffect(() => {
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const current = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
    setCurrentExercises(current);
  }, [currentPage, exercises]);

  // const paginate = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  //   window.scrollTo({ top: 1800, behavior: 'smooth' });
  // };

  return (
    <div className="bg-[#151515] pt-5 pb-25 px-5" id="exercises">
      <h2 className="text-3xl font-bold text-center mb-15 text-white">Showing Results</h2>

      <div className="flex flex-wrap justify-center gap-8">
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      {/* {exercises.length > exercisesPerPage && (
        <div className="mt-24 flex justify-center">
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(exercises.length / exercisesPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  currentPage === i + 1
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Exercises;
