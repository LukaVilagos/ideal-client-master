import { memo } from "react";
import Button from "../buttons/Button";
import ActionsWrapper from "./ActionsWrapper";

const ObjectActions = ({ actions }) => {
  return (
    <ActionsWrapper>
      {actions.map((action) => (
        <Button key={action}>{action}</Button>
      ))}
    </ActionsWrapper>
  );
};

export default memo(ObjectActions);
