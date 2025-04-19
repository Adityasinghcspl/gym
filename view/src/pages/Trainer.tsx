import { useState } from 'react';
import { toast } from 'react-toastify';
import { isAdmin } from '../utils/Utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import Trainers from '../components/Tables/Trainers';
import { SignUpTrainerForm, trainer } from '../types/type';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { getAllTrainers } from '../redux/features/trainer/trainerSlice';
import { signUpTrainer } from '../redux/features/auth/authSlice';
import CreateAndEditFormModel from '../components/Modal/CreateAndEditFormModel';

const Trainer = () => {
  const admin = isAdmin();
  const dispatch = useDispatch<AppDispatch>();
  const [isCreateModelOpen, setIsCreateModelOpen] = useState<boolean>(false);

  const handleCreateTrainer = async (newTrainer: trainer) => {
    try {
      const data = {
        name: newTrainer.name,
        email: newTrainer.email,
        phone_no: Number(newTrainer.phone_no),
        bio: newTrainer.bio,
        password: newTrainer.email,
      } as SignUpTrainerForm;
      const result = await dispatch(signUpTrainer(data));
      const payload = result.payload as { message: string };
      if (payload.message) {
        toast.success(payload.message);
      }
      setIsCreateModelOpen(false);
      dispatch(getAllTrainers());
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <>
      <Breadcrumb
        pageName="Trainer"
        RightElement={
          admin && (
            <button
              onClick={() => setIsCreateModelOpen(!isCreateModelOpen)}
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              Create
            </button>
          )
        }
      />

      <div className="flex flex-col gap-10">
        <Trainers />
      </div>

      {/* create trainer Form Modal */}
      {isCreateModelOpen && (
        <CreateAndEditFormModel
          entityType="Trainer"
          open={isCreateModelOpen}
          onClose={() => setIsCreateModelOpen(false)}
          onConfirm={handleCreateTrainer}
        />
      )}
    </>
  );
};

export default Trainer;
