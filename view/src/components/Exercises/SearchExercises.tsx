import React, { useEffect, useState } from 'react';
import { exerciseOptions, fetchData } from '../../utils/fetchData';

interface SearchExercisesProps {
  setExercises: React.Dispatch<React.SetStateAction<any[]>>;
  bodyPart: string;
  setBodyPart: React.Dispatch<React.SetStateAction<string>>;
}

const SearchExercises: React.FC<SearchExercisesProps> = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState<string[]>([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData<string[]>(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions,
      );
      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData<any[]>('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

      const searchedExercises = exercisesData.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.target.toLowerCase().includes(search) ||
          item.equipment.toLowerCase().includes(search) ||
          item.bodyPart.toLowerCase().includes(search),
      );

      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

      setSearch('');
      setExercises(searchedExercises);
    }
  };

  return (
    <div className="bg-[#151515] text-white py-20 px-5">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="font-bold text-3xl lg:text-5xl mb-15">
          Awesome Exercises You <br /> Should Know
        </h1>

        <div className="relative w-full max-w-[1170px] mb-16">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Exercises"
            className="w-full h-[56px] lg:h-[76px] px-5 rounded-full text-lg font-semibold outline-none text-gray-900"
          />
          <button
            onClick={handleSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white text-sm lg:text-lg font-semibold px-4 lg:px-6 py-2 lg:py-3 rounded-full"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {bodyParts.map((part) => (
            <button
              key={part}
              onClick={() => setBodyPart(part)}
              className={`px-4 py-2 rounded-full border transition ${
                bodyPart === part
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
            >
              {part.charAt(0).toUpperCase() + part.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchExercises;
