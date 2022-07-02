import UploadVideo from './UploadVideo';
import { FcVideoFile } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllVideos, deleteVideo } from '../../features/videos-slice';
import { useEffect } from 'react';
import Spinner from '../Spinner';
import Alert from '../Alert';
import { MdDelete } from 'react-icons/md';

interface ComponentProps {}

const Component: React.FC<ComponentProps> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllVideos());
  }, []);

  const { error, videos, loading } = useAppSelector((state) => {
    return {
      loading: state.videos.loading,
      videos: state.videos.data,
      error: state.videos.error,
    };
  });


  return (
    <div className='videos-dashboard'>
      <UploadVideo />
      {error && (<Alert variant='danger' message={error} />)}
      {loading ? (
        <Spinner />
      ) : (
        <div className='videos row g-2'>
          {videos.map((video) => {
            return (
              <div className='col-12 col-md-6 video' key={video.videoId}>
                <div className='video-title'>
                  <h2>{video.videoName}</h2>
                  <h3>{video.videoNumber}</h3>
                </div>
                <div className='rest'>
                  <FcVideoFile className='video-icon' />
                  <MdDelete
                    className='delete-icon'
                    onClick={() => {
                      dispatch(deleteVideo(video.videoId));
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Component;
