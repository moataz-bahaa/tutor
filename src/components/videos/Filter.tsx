import { useEffect, useState } from 'react';
import axios from 'axios';
import { State } from './VideosDashboard';

interface ComponentProps {
  setCurrent: React.Dispatch<React.SetStateAction<State>>;
  current: State;
}

interface Month {
  months: {
    monthId: number;
    monthText: string;
  };
}

interface Week {
  weeks: {
    weekId: number;
    weekText: string;
  };
}

const Component: React.FC<ComponentProps> = ({ current, setCurrent }) => {
  const [months, setMonths] = useState<Month[]>([]);
  const [weeks, setWeeks] = useState<Week[]>([]);

  useEffect(() => {
    const fetchMonthsByLevel = async (level: number) => {
      try {
        const res = await axios.get(`/Dates/Select/Video/Month/BY/Level/${level}`);
        setMonths(res.data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };

    current.level && fetchMonthsByLevel(current.level!);
  }, [current.level]);

  useEffect(() => {
    const fetchWeeksByMonth = async (month: number) => {
      try {
        const res = await axios.get(`/Dates/Select/Video/Weeks/BY/Month/${month}`);
        setWeeks(res.data);
      } catch (error: any) {
        console.log(error.response.data);
      }
    };
    current.month && fetchWeeksByMonth(current.month!);
  }, [current.month]);

  return (
    <div className='filter row g-2 mb-3'>
      <select
        className='col-12 col-md-4 form-control'
        value={current.level}
        onChange={(e) => {
          setCurrent((prev) => {
            return {
              type: 'level',
              page: 1,
              level: +e.target.value,
            };
          });
        }}
      >
        <option hidden>اختر الصف</option>
        <option value='1'>الصف الاول</option>
        <option value='2'>الصف الانى</option>
        <option value='3'>الصف الثالث</option>
      </select>
      <select
        className='col-12 col-md-4 form-control'
        value={current.month}
        onChange={(e) => {
          if (!+e.target.value) {
            return;
          }
          setCurrent((prev) => {
            return {
              type: 'level-month',
              page: 1,
              level: prev.level,
              month: +e.target.value,
            };
          });
        }}
      >
        <option hidden>اختر الشهر</option>

        {months.map((m) => (
          <option key={m.months.monthId} value={m.months.monthId}>
            {m.months.monthText}
          </option>
        ))}
      </select>
      <select
        className='col-12 col-md-4 form-control'
        value={current.week}
        onChange={(e) => {
          if (!+e.target.value) {
            return;
          }
          setCurrent((prev) => {
            return {
              ...prev,
              type: 'level-month-week',
              page: 1,
              week: +e.target.value,
            };
          });
        }}
      >
        <option hidden>اختر الاسبوع</option>
        {weeks.map((w) => (
          <option key={w.weeks.weekId} value={w.weeks.weekId}>
            {w.weeks.weekText}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Component;
