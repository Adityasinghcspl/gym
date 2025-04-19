import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Users from '../components/Tables/Users';
import { SignUpUserForm, } from '../types/type';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllUsers } from '../redux/features/user/userSlice';
import CreateAndEditFormModel from '../components/Modal/CreateAndEditFormModel';

const User = () => {
  const dispatch = useDispatch<AppDispatch>();
    const [isCreateModelOpen, setIsCreateModelOpen] = useState<boolean>(false);
  
    const handleCreateUser = async () => {
      try {
        // const data = {
        //   name: newTrainer.name,
        //   email: newTrainer.email,
        //   phone_no: Number(newTrainer.phone_no),
        //   bio: newTrainer.bio,
        //   password: newTrainer.email,
        // } as SignUpUserForm;
        // const result = await dispatch(signUpTrainer(data));
        // const payload = result.payload as { message: string };
        // if (payload.message) {
        //   toast.success(payload.message);
        // }
        setIsCreateModelOpen(false);
        dispatch(getAllUsers());
      } catch (error) {
        toast.error(error as string);
      }
    };
  return (
    <>
      <Breadcrumb
        pageName="User"
        leftElement={
          <button
            onClick={() => setIsCreateModelOpen(!isCreateModelOpen)}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Create
          </button>
        }
      />

      <div className="flex flex-col gap-10">
        <Users />
      </div>

      {/* create user Form Modal */}
      {isCreateModelOpen && (
        <CreateAndEditFormModel
          entityType="User"
          open={isCreateModelOpen}
          onClose={() => setIsCreateModelOpen(false)}
          onConfirm={handleCreateUser}
        />
      )}
    </>
  );
};

export default User;
