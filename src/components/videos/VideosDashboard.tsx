import UploadVideo from './UploadVideo';
import { FcVideoFile } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchAllVideos,
  deleteVideoById,
  fetchVideosByLevel,
  fetchVideosByMonth,
  fetchVideosByWeek,
} from '../../features/videos/videoActions';
import { clearVideosState } from '../../features/videos/videoSlice';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import Alert from '../Alert';
import { MdDelete } from 'react-icons/md';
import Pagination from '../Pagination';
import Filter from './Filter';
import { SpinnerForBtn } from '../Spinner';

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
  const [deleteVideoId, setDeleteVideoId] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (current.type === 'all') {
      dispatch(fetchAllVideos({ pageNumber: current.page }));
    } else if (current.type === 'level') {
      dispatch(fetchVideosByLevel({ level: current.level!, pageNumber: current.page }));
    } else if (current.type === 'level-month') {
      dispatch(
        fetchVideosByMonth({
          level: current.level!,
          month: current.month!,
          pageNumber: current.page,
        })
      );
    } else if (current.type === 'level-month-week') {
      dispatch(
        fetchVideosByWeek({
          level: current.level!,
          month: current.month!,
          week: current.week!,
          pageNumber: current.page,
        })
      );
    }

    return () => {
      dispatch(clearVideosState());
    };
  }, [current]);

  const { error, videos, loading, numberOfPages, lastAction } = useAppSelector(
    (state) => {
      const lastAction = state.lastAction;
      return {
        loading:
          state.videos.loading &&
          (lastAction === fetchAllVideos.pending.type ||
            lastAction === fetchVideosByLevel.pending.type ||
            lastAction === fetchVideosByMonth.pending.type ||
            lastAction === fetchVideosByWeek.pending.type),
        videos: state.videos.data.videos,
        numberOfPages: state.videos.data.pageCount,
        error:
          lastAction === fetchAllVideos.rejected.type ||
          lastAction === fetchVideosByLevel.rejected.type ||
          lastAction === fetchVideosByMonth.rejected.type ||
          lastAction === fetchVideosByWeek.rejected.type
            ? state.videos.error
            : '',
        lastAction,
      };
    }
  );
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
                    {lastAction === deleteVideoById.pending.type &&
                    deleteVideoId === video.videoId ? (
                      <SpinnerForBtn className='delete-icon' />
                    ) : (
                      <MdDelete
                        className='delete-icon'
                        onClick={() => {
                          dispatch(deleteVideoById(video.videoId));
                          setDeleteVideoId(video.videoId);
                        }}
                      />
                    )}
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
