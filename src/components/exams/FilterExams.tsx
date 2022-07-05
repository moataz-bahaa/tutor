import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getExamsByLevel } from '../../features/exam-slice';

interface FilterExamsProps {}

const FilterExams: React.FC<FilterExamsProps> = (props) => {
  const dispatch = useAppDispatch();

  const handleChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = +e.target.value;
    if (level === 0) {
      alert('اختر صف من 1 ل 3');
      return;
    }
    dispatch(getExamsByLevel({ level }));
  };
  return (
    <div className='filter-exams'>
      <select className='form-control' onChange={handleChangeLevel}>
        <option hidden>
          اختر الصف
        </option>
        <option value='1'>الصف الاول</option>
        <option value='2'>الصف الثانى</option>
        <option value='3'>الصف الثالث</option>
      </select>
    </div>
  );
};

export default FilterExams;
