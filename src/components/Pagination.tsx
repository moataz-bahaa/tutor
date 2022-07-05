interface ComponentProps {
  activePage: number;
  numberOfPages: number;
  setPage: (value: number) => void;
}

const Component: React.FC<ComponentProps> = ({ activePage, numberOfPages, setPage }) => {
  return (
    <div className='pagination mt-5'>
      <div
        className={`pagination-item ${activePage === 1 ? 'disabled' : ''}`}
        onClick={() => setPage(activePage - 1)}
      >
        &laquo;
      </div>
      {Array(numberOfPages)
        .fill(null)
        .map((el, index) => {
          return (
            <div
              key={index}
              className={`pagination-item ${activePage === index + 1 ? 'active' : ''}`}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </div>
          );
        })}
      <div
        className={`pagination-item ${activePage === numberOfPages ? 'disabled' : ''}`}
        onClick={() => setPage(activePage + 1)}
      >
        &raquo;
      </div>
    </div>
  );
};

export default Component;
