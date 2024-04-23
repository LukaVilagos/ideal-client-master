import HeaderWrapper from "./HeaderWrapper";

const UserHeader = ({ user }) => {
  return (
    <HeaderWrapper>
      <img alt="" className="bg-gray-600 w-24 h-24 rounded-full object-cover" />
      <div>
        <h2 className="py-1 text-4xl font-bold">{user.name}</h2>
        <span className="text-gray-600">{user.email}</span>
      </div>
    </HeaderWrapper>
  );
};

export default UserHeader;
