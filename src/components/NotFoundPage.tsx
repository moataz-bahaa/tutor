interface NotFoundPageProps {
  message?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ message }) => {
  return (
    <div className='not-found-page'>
      <div className='container py-5'>
        {message ? (
          <div>{message}</div>
        ) : (
          <>
            <div className='title'>الصفحة المطلوبه غير موجوده</div>
            <div className='title'>Not Found 404</div>
          </>
        )}
      </div>
    </div>
  );
}

export default NotFoundPage