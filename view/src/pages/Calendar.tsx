import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

interface CalendarDay {
  date: number;
  day: number;
  exercise: string;
}

const exercises: { [key: number]: string } = {
  0: 'OFF',      // Sunday
  1: 'Chest',    // Monday
  2: 'Back',     // Tuesday
  3: 'Shoulder', // Wednesday
  4: 'Bicep',    // Thursday
  5: 'Legs',     // Friday
  6: 'Triceps',  // Saturday
};

const Calendar = () => {
  const [calendarDays, setCalendarDays] = useState<(CalendarDay | null)[]>([]);

  useEffect(() => {
    const generateCalendar = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();

      const firstDay = new Date(year, month, 1);
      const startingDayOfWeek = firstDay.getDay();

      const lastDay = new Date(year, month + 1, 0);
      const totalDays = lastDay.getDate();

      const days: (CalendarDay | null)[] = [];

      // Fill in blank cells
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }

      // Fill in actual days
      for (let i = 1; i <= totalDays; i++) {
        const dayDate = new Date(year, month, i);
        days.push({
          date: i,
          day: dayDate.getDay(),
          exercise: exercises[dayDate.getDay()],
        });
      }

      setCalendarDays(days);
    };

    generateCalendar();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Calendar" />

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <th
                  key={day}
                  className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-7 flex-wrap">
              {calendarDays.map((day, index) => (
                <td
                  key={index}
                  className={`flex min-h-[80px] flex-col items-center justify-start border p-1 text-xs sm:text-sm ${
                    day?.day === 0 ? 'bg-red-100 dark:bg-red-800' : ''
                  }`}
                >
                  {day ? (
                    <>
                      <span className="font-bold">{day.date}</span>
                      <span className="text-base">{day.exercise}</span>
                    </>
                  ) : null}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </>
  );
};

export default Calendar;
