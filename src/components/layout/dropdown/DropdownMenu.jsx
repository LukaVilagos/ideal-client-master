import { useState } from "react";
import DropdownHeader from "./DropdownHeader";
import DropdownItem from "./DropdownItem";

function DropdownMenu({ items, item }) {
  const [shown, setShown] = useState(false);

  const handleToggleShow = () => {
    setShown(!shown);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShown(false);
    }
  };

  return (
    <div onBlur={handleBlur} tabIndex={0}>
      <DropdownHeader clickFunction={handleToggleShow}>
        {item.name}
      </DropdownHeader>
      {shown &&
        items.map((element) => (
          <DropdownItem key={element.name} link={element.href}>
            {element.name}
          </DropdownItem>
        ))}
    </div>
  );
}

export default DropdownMenu;
