const PopupBackdrop = ({ children }) => {
  return (
    <div className="fixed w-screen h-screen backdrop-brightness-75 top-0 right-0 z-20">
      {children}
    </div>
  );
};

export default PopupBackdrop;
