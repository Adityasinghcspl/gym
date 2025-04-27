import { useEffect, useState } from 'react';
import { MdClose, MdCancel } from 'react-icons/md';
import { Membership } from '../../types/type';

interface MemberShipModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: Membership) => void;
  initialData?: Membership;
}

const allFeatures = [
  'Trainer',
  'Personal Trainer',
  'Diet Plan',
  'Group Classes',
  'Locker Room Access',
  'Online Consultation',
  'Cardio Equipment',
  'Strength Training',
  'Yoga Sessions',
  'Physical Therapy',
  'Unlimited Equipments'
];

export default function MemberShipModal({ open, onClose, onConfirm, initialData }: MemberShipModalProps) {
  const isEditMode = !!initialData && '_id' in initialData && initialData._id;

  const [formData, setFormData] = useState<Membership>({
    type: 'Monthly',
    price: 0,
    durationInMonths: 1,
    features: [],
    ...(initialData || {}),
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto p-4">
      <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-2xl w-full max-w-lg p-8 mt-15">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {isEditMode ? 'Edit' : 'Create'} Membership
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block mb-1 text-sm font-medium">Type</label>
            <select
              className="w-full border px-3 py-2 rounded dark:bg-meta-4 dark:text-white"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Membership['type'] })}
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Half-Yearly">Half-Yearly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 text-sm font-medium">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full border px-3 py-2 rounded dark:bg-meta-4 dark:text-white"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block mb-1 text-sm font-medium">Duration (Months)</label>
            <input
              type="number"
              value={formData.durationInMonths}
              onChange={(e) => setFormData({ ...formData, durationInMonths: parseInt(e.target.value) })}
              className="w-full border px-3 py-2 rounded dark:bg-meta-4 dark:text-white"
              required
            />
          </div>

          {/* Features Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium">Features</label>
            <div className="h-25 overflow-y-auto border px-3 py-2 rounded dark:bg-meta-4 dark:text-white">
              <div className="grid grid-cols-2 gap-2">
                {allFeatures.map((feature) => (
                  <label key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={feature}
                      checked={formData.features.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="accent-blue-600"
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Features */}
          {formData.features.length > 0 && (
            <div className="max-h-20 overflow-y-auto mt-2 flex flex-wrap gap-2">
              {formData.features.map((feature) => (
                <span
                  key={feature}
                  className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className="ml-2 text-blue-500 hover:text-red-500"
                  >
                    <MdCancel size={16} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow">
            {isEditMode ? 'Update Membership' : 'Create Membership'}
          </button>
        </form>
      </div>
    </div>
  );
}
