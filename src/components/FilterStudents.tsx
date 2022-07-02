import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { getStudentsByLevel, getStudentsByName } from '../features/students-slice';

interface ComponentProps {}

const Component: React.FC<ComponentProps> = ({}) => {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();

  const handleChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = +e.target.value;
    if (level === 0) {
      alert('اختر صف من 1 ل 3');
      return;
    }
    dispatch(getStudentsByLevel(level));
  };

  const searchByName = () => {
    if (name === '') {
      alert('اكتب اسم');
    }
    dispatch(getStudentsByName(name));
  };

  return (
    <div className='row g-2 filter-students mb-3'>
      <div className='col-12 col-md-6'>
        <select className='form-control' onChange={handleChangeLevel}>
          <option value='0' defaultChecked>
            اختر الصف
          </option>
          <option value='1'>الصف الاول</option>
          <option value='2'>الصف الثانى</option>
          <option value='3'>الصف الثالث</option>
        </select>
      </div>
      <div className='col-12 col-md-6'>
        <div className='by-name d-flex'>
          <input
            type='text'
            className='form-control'
            placeholder='ابحث بالاسم'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className='btn btn-blue mr-1' onClick={searchByName}>
            بحث
          </button>
        </div>
      </div>
    </div>
  );
};

export default Component;
