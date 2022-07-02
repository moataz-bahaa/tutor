import { useState } from 'react';
import Dropdown from '../components/Dropdown';
import ExamsDashboard from '../components/exams/ExamsDashboard';
import StudentsDashboard from '../components/StudentsDashboard';
import VideosDashboard from '../components/VideoDashboard';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const [selectValue, setSelectValue] = useState('');
  const dropdownItems = [
    {
      label: 'الطلاب',
      onClick: () => setSelectValue('students')
    },
    {
      label: 'الامتحانات',
      onClick: () => setSelectValue('exams')
    },
    {
      label: 'الفيديوهات',
      onClick: () => setSelectValue('videos')
    }
  ]
  return (
    <div className='dashboard py-10'>
      <div className='container'>
        <Dropdown 
          title='اختر'
          items={dropdownItems}
        />
        {selectValue === 'students' && (
          <StudentsDashboard />
        )}
        {selectValue === 'videos' && <VideosDashboard />}
        {selectValue === 'exams' && <ExamsDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
