import { memo } from "react";
import HeaderWrapper from "./HeaderWrapper";

const CompanyHeader = ({ company }) => {
  return (
    <HeaderWrapper>
      <img
        src={company.imageUrl}
        alt={""}
        className="bg-gray-600 w-24 h-24 rounded-full object-cover"
      />
      <div>
        <h2 className="py-1 text-4xl font-bold">{company.name}</h2>
        <span className="text-gray-600">{company.address}</span>
      </div>
    </HeaderWrapper>
  );
};

export default memo(CompanyHeader);
