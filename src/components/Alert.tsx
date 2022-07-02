interface ComponentProps {
  heading?: string;
  message: string;
  footer?: string;
  variant: 'success' | 'danger'
}

const Component: React.FC<ComponentProps> = ({ heading, message, footer, variant }) => {
  return (
    <div className={`alert ${variant}`} role='alert'>
      {heading && <h4 className='alert-heading'>{heading}</h4>}
      <p>{message}</p>
      {footer && (
        <>
          <hr />
          <p style={{ marginBottom: '0' }}>{footer}</p>
        </>
      )}
    </div>
  );
};

export default Component;
