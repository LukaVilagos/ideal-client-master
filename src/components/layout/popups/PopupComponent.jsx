import { useEffect, useRef } from "react";
import PopupBackdrop from "./PopupBackdrop";

const PopupComponent = ({ children, big }) => {
  const inputReference = useRef(null);

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  return (
    <PopupBackdrop>
      <div
        ref={inputReference}
        className={`bg-white border-2 overflow-y-scroll border-gray-200 p-8 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-3xl shadow-lg shadow-gray-800 ${
          big ? "w-[90vw] h-[90vh]" : "w-96 h-96"
        }`}
      >
        {children}
      </div>
    </PopupBackdrop>
  );
};

export default PopupComponent;
