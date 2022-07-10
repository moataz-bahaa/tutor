interface NotFoundPageProps {
  message?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ message }) => {
  return (
    <div className='container pt-10 not-found-page'>
        {message ? (
          <div className='title'>{message}</div>
        ) : (
          <>
            <div className='title'>الصفحة المطلوبه غير موجوده</div>
            <div className='title'>Not Found 404</div>
          </>
        )}
    </div>
  );
}

export default NotFoundPage