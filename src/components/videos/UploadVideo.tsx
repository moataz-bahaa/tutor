import React, { useState } from 'react';
import Modal from '../Modal';
import { useAppDispatch } from '../../app/hooks';
import { uploadVideo } from '../../features/videos-slice';
import { NavLink } from 'react-router-dom';

interface UploadVideoProps {}

const UploadVideo: React.FC<UploadVideoProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [videoData, setVideoData] = useState({
    name: '',
    number: '',
    week: '',
    month: '',
    date: '',
    note: '',
    level: '',
  });
  const dispatch = useAppDispatch();

  const preventDefault = (e: React.MouseEvent<HTMLDivElement>) => {
    return e.preventDefault();
  };

  const handleSelectFile = (e: React.MouseEvent<HTMLDivElement>) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any) => {
      const f = e.target.files[0];
      setFile(f);
    };
    input.click();
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoData((data) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleUploadVideo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert('اختؤ ملف اولا');
      return;
    }
    const formData = new FormData();
    formData.append('VideoName', videoData.name);
    formData.append('VideoNumber', videoData.number);
    formData.append('VideoWeek', videoData.week);
    formData.append('VideoMonth', videoData.month);
    formData.append('VideoDate', videoData.date);
    formData.append('VideoNotes', videoData.note);
    formData.append('LevelId', videoData.level);
    formData.append('files', file);

    dispatch(uploadVideo(formData));
    setShowModal(false);
  };

  return (
    <div className='mb-3'>
      <button className='btn btn-lg btn-blue' onClick={() => setShowModal(true)}>
        ارفع فيديو
      </button>
      <NavLink to='/record-video' className='btn btn-lg btn-blue mr-2'>
        سجل فيديو
      </NavLink>

      <Modal
        closeButton={true}
        onClose={() => {
          setShowModal(false);
          setFile(null);
        }}
        header='ارفع فيديو'
        footerButton={{
          text: 'ارفع',
          type: 'submit',
          form: 'video-form',
        }}
        show={showModal}
      >
        <div
          className='drag-drop my-2'
          onClick={handleSelectFile}
          onDragEnter={preventDefault}
          onDragOver={preventDefault}
          onDragLeave={preventDefault}
          onDrop={(ev) => {
            ev.preventDefault();
            setFile(ev.dataTransfer.files[0]);
          }}
        >
          {file ? file.name : 'امسك الملف واتركه هنا'}
        </div>
        <form id='video-form' onSubmit={handleUploadVideo}>
          <input
            required
            className='form-control mb-1'
            name='name'
            value={videoData.name}
            onChange={handleFormInputChange}
            type='text'
            placeholder='اسم الفديو'
          />
          <input
            required
            className='form-control mb-1'
            name='number'
            value={videoData.number}
            onChange={handleFormInputChange}
            type='number'
            placeholder='رقم الفديو'
          />
          <input
            required
            className='form-control mb-1'
            name='week'
            value={videoData.week}
            onChange={handleFormInputChange}
            type='number'
            placeholder='الاسبوع'
            min={1}
            max={4}
          />
          <input
            required
            className='form-control mb-1'
            name='month'
            value={videoData.month}
            onChange={handleFormInputChange}
            type='number'
            placeholder='الشهر'
            min={1}
            max={12}
          />
          <input
            required
            className='form-control mb-1'
            name='date'
            value={videoData.date}
            onChange={handleFormInputChange}
            type='date'
          />
          <input
            required
            className='form-control mb-1'
            name='note'
            value={videoData.note}
            onChange={handleFormInputChange}
            type='text'
            placeholder='ملاحظات'
          />
          <input
            required
            className='form-control mb-1'
            name='level'
            value={videoData.level}
            onChange={handleFormInputChange}
            type='number'
            min={1}
            max={3}
            placeholder='اختر المستوى'
          />
        </form>
      </Modal>
    </div>
  );
};

export default UploadVideo;
