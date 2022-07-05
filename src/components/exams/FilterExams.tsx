import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { State } from './ExamsDashboard';

interface FilterExamsProps {
  current: State;
  setCurrent: React.Dispatch<React.SetStateAction<State>>;
}

interface Month {
  months: {
    monthId: number;
    monthText: string;
  };
}

const FilterExams: React.FC<FilterExamsProps> = ({ current, setCurrent }) => {
  const [months, setMonths] = useState<Month[]>([]);
  useEffect(() => {
    const fetchMonths = async (level: number) => {
      try {
        const res = await axios.get(`/Dates/Select/Exam/Month/BY/Levels/${level}`);
        setMonths(res.data);
      } catch (err: any) {
        console.log(err.response.data);
      }
    };

    current.level && fetchMonths(current.level!);
  }, [current.level]);

  return (
    <div className='filter-exams row g-2'>
      <select
        className='col-12 col-md-6 form-control'
        onChange={(e) => {
          setCurrent({
            type: 'level',
            level: +e.target.value,
            page: 1,
          });
        }}
      >
        <option hidden>اختر الصف</option>
        <option value='1'>الصف الاول</option>
        <option value='2'>الصف الثانى</option>
        <option value='3'>الصف الثالث</option>
      </select>
      <select
        className='col-12 col-md-6 form-control'
        onChange={(e) => {
          setCurrent((prev) => {
            return {
              ...prev,
              type: 'level-month',
              month: +e.target.value,
              page: 1,
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
    </div>
  );
};

export default FilterExams;
