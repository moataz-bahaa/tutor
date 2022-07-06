import Alert from '../Alert';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { uploadVideo } from '../../features/videos-slice';

interface ComponentProps {}

const Component: React.FC<ComponentProps> = (props) => {
  const [blob, setBlob] = useState({} as Blob);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();
  const { status, startRecording, stopRecording, error, mediaBlobUrl, previewStream } =
    useReactMediaRecorder({
      screen: true,
      onStop: (blobUrl, blob) => {
        alert('توقف التسسجيل');
        // const file = new File([blob], 'test.wav', {
        //   type: blob.type,
        // });
        setBlob(blob);
      },
    });

  useEffect(() => {
    if (videoRef.current && previewStream) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  if (error) {
    return <Alert message={error} variant='danger' />;
  }

  return (
    <div className='container py-5 pb-5 video-recorder'>
      <div className='info row g-2'>
        <button className='col-12 col-md-6 btn btn-lg btn-blue' onClick={startRecording}>
          ابدا التسجيل
        </button>
        <button className='col-12 col-md-6 btn btn-lg btn-blue' onClick={stopRecording}>
          اوقف التسجيل
        </button>
        {status === 'stopped' && (
          <>
            <a
              href={mediaBlobUrl}
              download
              className='col-12 col-md-6 btn btn-lg btn-blue'
            >
              تحميل الفيديو
            </a>
            <button className='col-12 col-md-6 btn btn-lg btn-blue' onClick={() => {
              // dispatch(uploadVideo({} as FormData));
            }}>
              ارفع الفديو
            </button>
          </>
        )}
      </div>
      <Alert variant='success' message={status} />
      <div className='d-flex js-center'>
        {status !== 'stopped' && (
          <video ref={videoRef} autoPlay width='100%' height={300} />
        )}
        {status === 'stopped' && (
          <video src={mediaBlobUrl} controls width='100%' height={300} />
        )}
      </div>
    </div>
  );
};

export default Component;
