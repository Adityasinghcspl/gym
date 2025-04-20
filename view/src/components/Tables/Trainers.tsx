import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Key, useEffect, useState } from 'react';
import { deleteTrainer, getAllTrainers, updateTrainer } from '../../redux/features/trainer/trainerSlice';
import Loader from '../../common/Loader';
import { MdDelete, MdFileCopy, MdModeEdit } from 'react-icons/md';
import { getTokenData, isAdmin } from '../../utils/Utils';
import { toast } from 'react-toastify';
import DeleteModal from '../Modal/DeleteModal';
import { trainer } from '../../types/type';
import CreateAndEditFormModel from '../Modal/CreateAndEditFormModel';

const Trainers = () => {
  const admin = isAdmin();
  const dispatch = useDispatch<AppDispatch>();
  const trainers = useSelector((state: RootState) => state.trainer?.trainersList);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<trainer | null>(null);

  const tokenData = getTokenData();
  const loggedInTrainerId = tokenData?.id;

  const handleDelete = (trainerId: string) => {
    setSelectedTrainerId(trainerId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const data = await dispatch(deleteTrainer(selectedTrainerId)).unwrap();
      toast.success(data?.message || 'Trainer deleted successfully');
      setShowDeleteModal(false);
      setSelectedTrainerId('');
      dispatch(getAllTrainers());
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleEdit = (trainer: trainer) => {
    setSelectedTrainer(trainer);
    setIsEditOpen(true);
  };

  const handleConfirmEdit = async (updatedTrainer: trainer) => {
    setIsEditOpen(false);
    try {
      const data = await dispatch(updateTrainer({ id: updatedTrainer._id, trainerData: updatedTrainer })).unwrap();
      toast.success(data?.message || 'Trainer Update successfully');
      setIsEditOpen(false);
      dispatch(getAllTrainers());
    } catch (error) {
      toast.error(error as string);
    }
  };

  useEffect(() => {
    dispatch(getAllTrainers()); // Dispatch the API call when component mounts
  }, [dispatch]); // Runs only on mount

  useEffect(() => {
    if (trainers.error) {
      toast.dismiss(); // optional: clear old toasts
      toast.error(trainers.error);
    }
  }, [trainers.error]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {trainers.loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/50 z-40">
          <Loader />
        </div>
      )}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {admin && <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>}
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">Name</th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Email</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Phone Number</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Created On</th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">Changed On</th>
            </tr>
          </thead>
          <tbody>
            {trainers.data?.map((trainer: trainer, key: Key | null | undefined) => (
              <tr key={key}>
                {admin && (
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary" onClick={() => handleEdit(trainer)}>
                        <MdModeEdit size={22} />
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          navigator.clipboard.writeText(trainer._id);
                        }}
                      >
                        <MdFileCopy size={22} />
                      </button>
                      {trainer._id !== loggedInTrainerId && (
                        <button className="text-danger hover:text-red-600" onClick={() => handleDelete(trainer._id)}>
                          <MdDelete size={22} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{trainer.name}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{trainer.email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{trainer.phone_no}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(trainer.createdAt).toLocaleString('en-US', {
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
                    {new Date(trainer.updatedAt).toLocaleString('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                      year: '2-digit',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DeleteModal
          entityType="trainer"
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => confirmDelete()}
        />
        {/* Edit Form Modal */}
        {selectedTrainer && (
          <CreateAndEditFormModel
            entityType="Trainer"
            open={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            onConfirm={handleConfirmEdit}
            initialData={selectedTrainer}
          />
        )}
      </div>
    </div>
  );
};

export default Trainers;
