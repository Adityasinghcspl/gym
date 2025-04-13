import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { trainer, User } from '../../types/type';

interface EditFormModalProps {
  entityType: 'Trainer' | 'User';
  open: boolean;
  onClose: () => void;
  onConfirm: (data: trainer | User) => void;
  initialData?: trainer | User;
}

export default function EditFormModal({ entityType, open, onClose, onConfirm, initialData }: EditFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<trainer | User>({
    defaultValues: initialData || {
      name: '',
      phone_no: '',
      email: '',
      bio: '',
      address: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 mt-10">
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Edit {entityType}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <MdClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onConfirm)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Full Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'Min 3 chars' } })}
              className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Phone Number</label>
            <input
              type="text"
              {...register('phone_no', {
                required: 'Phone number is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number' },
              })}
              className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
            {errors.phone_no && <p className="text-red-500 text-sm">{errors.phone_no.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email Address</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
              })}
              className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          {entityType === 'Trainer' ? (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Bio</label>
              <textarea
                rows={4}
                {...register('bio', {
                  required: 'Bio is required',
                  maxLength: { value: 200, message: 'Max 200 chars' },
                })}
                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              ></textarea>
              {entityType === 'Trainer' && 'bio' in errors && (
                <p className="text-red-500 text-sm">{errors.bio?.message}</p>
              )}
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Address</label>
              <textarea
                rows={4}
                {...register('address', {
                  required: 'Address is required',
                  maxLength: { value: 200, message: 'Max 200 chars' },
                })}
                className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              ></textarea>
              {entityType === 'User' && 'address' in errors && (
                <p className="text-red-500 text-sm">{errors.address?.message}</p>
              )}
            </div>
          )}
          <div className="flex justify-end gap-4">
            {/* <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 dark:text-gray-300"
            >
              Cancel
            </button> */}
            <button
              type="submit"
              disabled={!isDirty}
              className={`px-4 py-2 rounded text-white ${
                isDirty ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
