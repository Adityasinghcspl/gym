import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import {
  createMembership,
  deleteMembership,
  getAllMemberships,
  updateMembership,
} from '../redux/features/membership/membershipSlice';
import { Membership } from '../types/type';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import DeleteModal from '../components/Modal/DeleteModal';
import MemberShipModal from '../components/Modal/MemberShipModal';
import { isAdmin } from '../utils/Utils';
import Loader from '../common/Loader';

const MemberShip = () => {
  const admin = isAdmin();
  const dispatch = useDispatch<AppDispatch>();
  const { membershipsList } = useSelector((state: RootState) => state.membership);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [selectedMemberShipId, setSelectedMemberShipId] = useState<string>('');
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Membership>({
    type: 'Monthly',
    price: 0,
    durationInMonths: 1,
    features: [],
  });

  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);

  const handleEdit = (membership: Membership) => {
    setFormData(membership);
    setEditId(membership._id || null);
    setShowFormModal(true);
  };

  const handleDelete = (id: string) => {
    setShowDeleteModal(true);
    setSelectedMemberShipId(id);
  };

  const confirmDelete = async () => {
    try {
      const data = await dispatch(deleteMembership(selectedMemberShipId)).unwrap();
      toast.success(data?.message || 'Membership deleted successfully');
      setShowDeleteModal(false);
      setSelectedMemberShipId('');
      dispatch(getAllMemberships());
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleCreateClick = () => {
    setFormData({ type: 'Monthly', price: 0, durationInMonths: 1, features: [] });
    setEditId(null);
    setShowFormModal(true);
  };

  const handleSubmit = async (data: Membership) => {
    try {
      if (editId) {
        await dispatch(updateMembership({ id: editId, membershipData: data })).unwrap();
        toast.success('Membership updated successfully');
      } else {
        await dispatch(createMembership(data)).unwrap();
        toast.success('Membership created successfully');
      }
      setShowFormModal(false);
      dispatch(getAllMemberships());
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <>
      <Breadcrumb
        pageName="MemberShip"
        RightElement={
          admin && (
            <button
              onClick={handleCreateClick}
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              Add Membership
            </button>
          )
        }
      />

      <div className="bg-white p-4 rounded-lg shadow-md dark:border-strokedark dark:bg-boxdark">
        <div className="overflow-x-auto">
          {membershipsList.loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/50 z-40">
              <Loader />
            </div>
          )}
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                {admin && <th className="py-2 px-4">Actions</th>}
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Duration</th>
                <th className="py-2 px-4">Features</th>
              </tr>
            </thead>
            <tbody>
              {membershipsList.data?.map((membership) => (
                <tr key={membership._id} className="border-b">
                  {admin && (
                    <td className="py-2 px-4 space-x-4 flex items-center">
                      <button onClick={() => handleEdit(membership)} className="hover:text-primary">
                        <MdModeEdit size={20} />
                      </button>
                      <button onClick={() => handleDelete(membership._id!)} className="text-red-500 hover:text-red-600">
                        <MdDelete size={20} />
                      </button>
                    </td>
                  )}
                  <td className="py-2 px-4">{membership.type}</td>
                  <td className="py-2 px-4">₹{membership.price}</td>
                  <td className="py-2 px-4 ">{membership.durationInMonths} months</td>
                  <td className="py-2 px-4">{membership.features.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delete Modal */}
        <DeleteModal
          entityType="MemberShip"
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => confirmDelete()}
        />

        {/* Create / Edit Membership Modal */}
        <MemberShipModal
          open={showFormModal}
          onClose={() => setShowFormModal(false)}
          onConfirm={handleSubmit}
          initialData={formData}
        />
      </div>
    </>
  );
};

export default MemberShip;
