import React, { useState } from 'react';

interface ComponentProps {
  setCurrent: React.Dispatch<
    React.SetStateAction<{
      type: 'all' | 'level' | 'search';
      activePage: number;
      value?: string | number | undefined;
    }>
  >;
}

const Component: React.FC<ComponentProps> = ({ setCurrent }) => {
  const [name, setName] = useState('');

  const handleChangeLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = e.target.value;
    if (level === 'all') {
      setCurrent({
        type: 'all',
        activePage: 1,
      });
    } else {
      setCurrent({
        type: 'level',
        activePage: 1,
        value: +level,
      });
    }
  };

  const searchByName = () => {
    if (name === '') {
      alert('اكتب اسم');
    }
    setCurrent({
      type: 'search',
      activePage: 1,
      value: name,
    });
  };

  return (
    <div className='row g-2 filter-students mb-3'>
      <div className='col-12 col-md-6'>
        <select className='form-control' onChange={handleChangeLevel}>
          <option value='all' defaultChecked>
            كل الطلاب
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
