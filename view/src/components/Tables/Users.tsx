import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader';
import { MdDelete, MdFileCopy, MdModeEdit, MdCardMembership } from 'react-icons/md';
import { toast } from 'react-toastify';
import DeleteModal from '../Modal/DeleteModal';
import { User } from '../../types/type';
import CreateAndEditFormModel from '../Modal/CreateAndEditFormModel';
import { assignMemberShipToUser, deleteUser, getAllUsers, updateUser } from '../../redux/features/user/userSlice';
import AssignAndUpdateMembershipModal from '../Modal/AssignAndUpdateMembershipModal';

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.userList);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isAssignOpen, setIsAssignOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDelete = (userId: string) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const data = await dispatch(deleteUser(selectedUserId)).unwrap();
      toast.success(data?.message || 'User deleted successfully');
      setShowDeleteModal(false);
      setSelectedUserId('');
      dispatch(getAllUsers());
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleAssignMemberShip = (user: User) => {
    setSelectedUser(user);
    setIsAssignOpen(true);
  };

  const handleConfirmEdit = async (updatedUser: User) => {
    setIsEditOpen(false);
    try {
      const data = await dispatch(updateUser({ id: updatedUser._id, userData: updatedUser })).unwrap();
      toast.success(data?.message || 'User updated successfully');
      setIsEditOpen(false);
      dispatch(getAllUsers());
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleConfirmAssignMembership = async (membershipData: {
    id: string;
    membershipId: string;
    membershipStartDate: string;
    membershipEndDate: string;
  }) => {
    const data = await dispatch(assignMemberShipToUser(membershipData)).unwrap();
    toast.success(data?.message || 'Membership assigned/updated successfully');
    dispatch(getAllUsers());
    setIsAssignOpen(false);
  };

  const getMembershipInitialData = (user: User | null) => {
    if (user?._id) {
      return {
        id: user._id,
        membershipId: user?.membershipId,
        membershipStartDate: user?.membershipStartDate,
        membershipEndDate: user?.membershipEndDate,
      };
    }
    return undefined;
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users.error) {
      toast.dismiss();
      toast.error(users.error);
    }
  }, [users.error]);

  return (
    <div className="relative rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {users.loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/50 z-40">
          <Loader />
        </div>
      )}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Name</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Email</th>
              <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">Phone Number</th>
              <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">Created On</th>
              <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">Changed On</th>
              <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">MemberShip Type</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Price</th>
              <th className="min-w-[190px] py-4 px-4 font-medium text-black dark:text-white">MemberShip Start</th>
              <th className="min-w-[190px] py-4 px-4 font-medium text-black dark:text-white">MemberShip End</th>
            </tr>
          </thead>
          <tbody>
            {users.data?.map((user, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={() => handleEdit(user)}>
                      <MdModeEdit size={22} />
                    </button>
                    <button className="hover:text-primary" onClick={() => handleAssignMemberShip(user)}>
                      <MdCardMembership size={22} />
                    </button>
                    <button className="hover:text-primary" onClick={() => navigator.clipboard.writeText(user._id)}>
                      <MdFileCopy size={22} />
                    </button>
                    <button className="text-danger hover:text-red-600" onClick={() => handleDelete(user._id)}>
                      <MdDelete size={22} />
                    </button>
                  </div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{user.name}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.phone_no}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(user.createdAt).toLocaleString('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                      year: '2-digit',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(user.updatedAt).toLocaleString('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                      year: '2-digit',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user?.membershipId?.type}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user?.membershipId?.price}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {' '}
                    {user?.membershipStartDate
                      ? new Date(user.membershipStartDate).toLocaleString('en-US', {
                          month: 'numeric',
                          day: 'numeric',
                          year: '2-digit',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })
                      : ''}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user?.membershipEndDate
                      ? new Date(user.membershipEndDate).toLocaleString('en-US', {
                          month: 'numeric',
                          day: 'numeric',
                          year: '2-digit',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })
                      : ''}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete Modal */}
        <DeleteModal
          entityType="User"
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => confirmDelete()}
        />

        {/* Edit User Modal */}
        {selectedUser && (
          <CreateAndEditFormModel
            entityType="User"
            open={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            onConfirm={handleConfirmEdit}
            initialData={selectedUser}
          />
        )}

        {/* Assign/Update Membership Modal */}
        {selectedUser && (
          <AssignAndUpdateMembershipModal
            open={isAssignOpen}
            onClose={() => setIsAssignOpen(false)}
            onConfirm={handleConfirmAssignMembership}
            initialData={getMembershipInitialData(selectedUser)}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
