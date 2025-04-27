import { useState } from 'react';
import SearchExercises from '../../components/Exercises/SearchExercises';
import Exercises from '../../components/Exercises/Exercises';
import StieBreadcrumb from '../../components/Breadcrumbs/StieBreadcrumb';
import GetInTouch from '../../components/GetInTouch/GetInTouch';
import Footer from '../../components/Footer/Footer';

// Reuse this interface across components
interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
  gifUrl: string;
}

const Exercise = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [bodyPart, setBodyPart] = useState<string>('all');

  return (
    <>
      <StieBreadcrumb />
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <Exercises exercises={exercises} setExercises={setExercises} bodyPart={bodyPart} />
      <GetInTouch />
      <Footer />
    </>
  );
};

export default Exercise;
