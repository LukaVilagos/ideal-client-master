function DropdownHeader({ children, clickFunction }) {
  return (
    <h3 onClick={clickFunction} className={"p-2 m-2 font-bold cursor-pointer"}>
      {children}
    </h3>
  );
}

export default DropdownHeader;
