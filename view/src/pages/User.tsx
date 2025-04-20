import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Users from '../components/Tables/Users';
import { SignUpUserForm, User as UserType, } from '../types/type';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllUsers } from '../redux/features/user/userSlice';
import CreateAndEditFormModel from '../components/Modal/CreateAndEditFormModel';
import { signUpUser } from '../redux/features/auth/authSlice';

const User = () => {
  const dispatch = useDispatch<AppDispatch>();
    const [isCreateModelOpen, setIsCreateModelOpen] = useState<boolean>(false);
  
    const handleCreateUser = async (newUser: UserType) => {
      try {
        const data = {
          name: newUser.name,
          email: newUser.email,
          phone_no: Number(newUser.phone_no),
          address: newUser.address,
          password: newUser.email,
        } as SignUpUserForm;
        const result = await dispatch(signUpUser(data));
        const payload = result.payload as { message: string };
        if (payload.message) {
          toast.success(payload.message);
        }
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
        RightElement={
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
