import { HiOutlineExclamationCircle } from 'react-icons/hi';

type DeleteModalProps = {
  entityType: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteModal({ entityType, open, onClose, onConfirm }: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-300" />
          <h3 className="mb-5 text-lg font-semibold text-gray-700 dark:text-gray-200">
            Are you sure you want to delete this {entityType}?
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition duration-200 shadow-md"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={onClose}
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 shadow-sm"
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
