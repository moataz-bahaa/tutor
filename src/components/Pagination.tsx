interface ComponentProps {
  activePage: number;
  numberOfPages?: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}

const Component: React.FC<ComponentProps> = ({ activePage, numberOfPages = 6, setActivePage }) => {
  return (
    <div className='pagination mt-5' lang='ar'>
      <div className='pagination-item'>&laquo;</div>
      {Array(Math.min(numberOfPages, 5))
        .fill(null)
        .map((el, index) => {
          return (
            <div
              key={index}
              className={`pagination-item ${activePage === index + 1 ? 'active' : ''}`}
              onClick={() => setActivePage(index + 1)}
            >
              {index + 1}
            </div>
          );
        })}
      {/* {numberOfPages > 5 && <div className='pagination-item'>...</div>} */}
      <div className='pagination-item'>&raquo;</div>
    </div>
  );
};

export default Component;
