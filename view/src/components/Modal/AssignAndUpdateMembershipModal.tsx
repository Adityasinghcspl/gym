import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Membership } from '../../types/type';
import { getAllMemberships } from '../../redux/features/membership/membershipSlice';

interface AssignAndUpdateMembershipModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: {
    id: string;
    membershipId: string;
    membershipStartDate: string;
    membershipEndDate: string;
  }) => void;
  initialData?: { id: string; membershipId?: string; membershipStartDate?: string; membershipEndDate?: string };
}

export default function AssignAndUpdateMembershipModal({
  open,
  onClose,
  onConfirm,
  initialData,
}: AssignAndUpdateMembershipModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { membershipsList } = useSelector((state: RootState) => state.membership);

  const [membershipId, setMembershipId] = useState('');
  const [membershipStartDate, setMembershipStartDate] = useState('');
  const [membershipEndDate, setMembershipEndDate] = useState('');

  // Helper to format Date object as MM/DD/YYYY
  const formatDateForDisplay = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Helper to format ISO date string into yyyy-MM-dd for <input type="date" />
  const formatDateForInput = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0]; // gets 'yyyy-mm-dd'
  };

  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);

  // Populate form when initialData is provided
  useEffect(() => {
    if (initialData) {
      setMembershipId(initialData.membershipId || '');
      if (initialData.membershipStartDate) {
        setMembershipStartDate(formatDateForInput(initialData.membershipStartDate));
      } else {
        setMembershipStartDate('');
      }

      if (initialData.membershipEndDate) {
        const expiryDate = new Date(initialData.membershipEndDate);
        setMembershipEndDate(formatDateForDisplay(expiryDate));
      } else {
        setMembershipEndDate('');
      }
    } else {
      setMembershipId('');
      setMembershipStartDate('');
      setMembershipEndDate('');
    }
  }, [initialData, open]);

  // Auto-calculate expiry when membershipId or start date changes
  useEffect(() => {
    if (membershipId && membershipStartDate) {
      const selectedMembership = membershipsList.data?.find((m) => m._id === membershipId);
      if (selectedMembership) {
        const durationMonths = selectedMembership.durationInMonths || 0;
        const start = new Date(membershipStartDate);
        const expiry = new Date(start.setMonth(start.getMonth() + durationMonths));
        setMembershipEndDate(formatDateForDisplay(expiry));
      }
    } else {
      setMembershipEndDate('');
    }
  }, [membershipId, membershipStartDate, membershipsList]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (membershipId && membershipStartDate && membershipEndDate) {
      onConfirm({
        id: initialData?.id || '',
        membershipId,
        membershipStartDate,
        membershipEndDate,
      });
    }
  };

  const handleClose = () => {
    // Clear form
    setMembershipId('');
    setMembershipStartDate('');
    setMembershipEndDate('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 mt-10">
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {initialData ? 'Update Membership' : 'Assign Membership'}
          </h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <MdClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Membership Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Select Membership</label>
            <select
              value={membershipId}
              onChange={(e) => setMembershipId(e.target.value)}
              className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white focus:border-primary focus-visible:outline-none"
              required
            >
              <option value="">Select...</option>
              {membershipsList.data?.map((membership: Membership) => (
                <option key={membership._id} value={membership._id}>
                  {membership.type} ({membership.durationInMonths} months)
                </option>
              ))}
            </select>
          </div>

          {/* Start Date Picker */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Start Date</label>
            <input
              type="date"
              value={membershipStartDate}
              onChange={(e) => setMembershipStartDate(e.target.value)}
              className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white focus:border-primary focus-visible:outline-none"
              required
            />
          </div>

          {/* Expiry Date View Only */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Expiry Date</label>
            <input
              type="text"
              value={membershipEndDate}
              disabled
              className="w-full rounded border border-stroke bg-gray-200 dark:bg-gray-700 py-3 pl-5 pr-4.5 text-black dark:text-white focus-visible:outline-none"
              placeholder="Expiry will be auto-calculated"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
              disabled={!membershipId || !membershipStartDate}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
