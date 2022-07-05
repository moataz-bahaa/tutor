import UploadVideo from './UploadVideo';
import { FcVideoFile } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllVideos,
  deleteVideo,
  getVideosByLevel,
  getVideosByMonth,
  getVideosByWeek,
} from '../../features/videos-slice';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import Alert from '../Alert';
import { MdDelete } from 'react-icons/md';
import Pagination from '../Pagination';
import Filter from './Filter';

interface ComponentProps {}

export interface State {
  type: 'all' | 'level' | 'level-month' | 'level-month-week';
  page: number;
  level?: number;
  month?: number;
  week?: number;
}

const Component: React.FC<ComponentProps> = (props) => {
  const [current, setCurrent] = useState<State>({ type: 'all', page: 1 });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (current.type === 'all') {
      dispatch(getAllVideos({ pageNumber: current.page }));
    } else if (current.type === 'level') {
      dispatch(getVideosByLevel({ level: current.level!, pageNumber: current.page }));
    } else if (current.type === 'level-month') {
      dispatch(
        getVideosByMonth({
          level: current.level!,
          month: current.month!,
          pageNumber: current.page,
        })
      );
    } else if (current.type === 'level-month-week') {
      dispatch(
        getVideosByWeek({
          level: current.level!,
          month: current.month!,
          week: current.week!,
          pageNumber: current.page,
        })
      );
    }
  }, [current]);

  const { error, videos, loading, numberOfPages } = useAppSelector((state) => {
    return {
      loading: state.videos.loading,
      videos: state.videos.data.videos,
      numberOfPages: state.videos.data.pageCount,
      error: state.videos.error,
    };
  });

  return (
    <div className='videos-dashboard'>
      <UploadVideo />
      <Filter current={current} setCurrent={setCurrent} />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant='danger' message={error} />
      ) : (
        <>
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
          <Pagination
            activePage={current.page}
            numberOfPages={numberOfPages}
            setPage={(value: number) => {
              setCurrent((prev) => {
                return {
                  ...prev,
                  page: value,
                };
              });
            }}
          />
        </>
      )}
    </div>
  );
};

export default Component;
