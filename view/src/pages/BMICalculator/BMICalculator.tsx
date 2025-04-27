import { useState, ChangeEvent, FormEvent } from 'react';
import StieBreadcrumb from '../../components/Breadcrumbs/StieBreadcrumb';
import Footer from '../../components/Footer/Footer';
import GetInTouch from '../../components/GetInTouch/GetInTouch';

export default function BMICalculator() {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBmi] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (!heightInMeters || !weightInKg) {
      setBmi(null);
      setStatus('Please enter valid numbers.');
      return;
    }

    const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    const formattedBmi = calculatedBmi.toFixed(1);
    setBmi(formattedBmi);

    if (calculatedBmi < 18.5) {
      setStatus('Underweight');
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setStatus('Healthy');
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setStatus('Overweight');
    } else {
      setStatus('Obese');
    }
  };

  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  return (
    <>
      <StieBreadcrumb />

      <div className="bg-black-2 text-white px-6 md:px-10 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Chart Table */}
            <div className="w-full lg:w-1/2">
              <div className="mb-6">
                <span className="text-orange-500 text-sm uppercase tracking-wide">check your body</span>
                <h2 className="text-3xl font-bold mt-2">BMI CALCULATOR CHART</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg text-left">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 border-b border-gray-700">BMI</th>
                      <th className="px-4 py-3 border-b border-gray-700">WEIGHT STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-700">
                      <td className="px-4 py-3 text-orange-500">Below 18.5</td>
                      <td className="px-4 py-3">Underweight</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="px-4 py-3 text-orange-500">18.5 - 24.9</td>
                      <td className="px-4 py-3">Healthy</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="px-4 py-3 text-orange-500">25.0 - 29.9</td>
                      <td className="px-4 py-3">Overweight</td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="px-4 py-3 text-orange-500">30.0 and Above</td>
                      <td className="px-4 py-3">Obese</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* BMI Calculator Form */}
            <div className="w-full lg:w-1/2">
              <div className="mb-6">
                <span className="text-orange-500 text-sm uppercase tracking-wide">check your body</span>
                <h2 className="text-3xl font-bold mt-2">CALCULATE YOUR BMI</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Enter your height and weight to calculate your BMI and see your weight status.
              </p>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Height / cm"
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none"
                  value={height}
                  onChange={handleHeightChange}
                />
                <input
                  type="number"
                  placeholder="Weight / kg"
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none"
                  value={weight}
                  onChange={handleWeightChange}
                />
                <input
                  type="text"
                  placeholder="Age"
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Sex (optional)"
                  className="px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none"
                />
                <div className="col-span-1 md:col-span-2">
                  <button
                    type="submit"
                    className="w-full inline-block border-2 border-orange-500 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white font-semibold py-3 rounded-lg"
                  >
                    Calculate
                  </button>
                </div>
              </form>

              {/* Result */}
              {bmi && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <p className="text-lg font-semibold">
                    Your BMI: <span className="text-orange-500">{bmi}</span>
                  </p>
                  <p className="text-sm mt-1 text-gray-300">Status: {status}</p>
                </div>
              )}
              {!bmi && status && (
                <div className="mt-4 text-red-500 font-medium">{status}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <GetInTouch />
      <Footer />
    </>
  );
}
