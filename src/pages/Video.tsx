import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useParams } from 'react-router-dom';
import { fetchVideoById } from '../features/videos/videoActions';
import { clearVideosState } from '../features/videos/videoSlice';
import { useEffect } from 'react';
import Spinner from '../components/Spinner';
import NotFoundPage from '../components/NotFoundPage';

interface VideoProps {}

const baseURL = 'http://mobisite201.somee.com';

const Video: React.FC<VideoProps> = ({}) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchVideoById(+id!));

    return () => {
      dispatch(clearVideosState());
    };
  }, []);

  const { loading, video, error } = useAppSelector((state) => {
    return {
      loading: state.videos.loading,
      video: state.videos.currentVideo,
      error: state.videos.error,
    };
  });

  if (loading) {
    return (
      <div className='pt-10'>
        <Spinner />
      </div>
    );
  }

  if (error || !video) {
    return <NotFoundPage message={error} />;
  }

  console.log(video.videoPath);
  return (
    <div className='container pt-10 pb-5 video'>
      <h1 className='mb-1 text-center'>{video.videoName}</h1>
      <ul className='list-items mb-3'>
        <li>الصف: {video.levelName}</li>
        <li>الشهر: {video.monthText}</li>
        <li>التاريخ: {video.videoDate}</li>
        <li>الرقم التعريفى: {video.videoId}</li>
        <li>الاسم: {video.videoName}</li>
        <li>الملاحظات: {video.videoNotes}</li>
        <li>الرقم: {video.videoNumber}</li>
        <li>الاسبوع: {video.weekText}</li>
      </ul>
      <video src={baseURL + video.videoPath} controls width='100%' height='500'></video>
    </div>
  );
};

export default Video;
