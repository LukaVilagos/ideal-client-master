const PageWrapper = ({ children }) => {
  return (
    <div className="ml-[calc(var(--sidebar-width)+2rem)] pr-8 mb-8">
      {children}
    </div>
  );
};

export default PageWrapper;
