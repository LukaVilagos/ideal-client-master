import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/authSlice";

const LoginComponent = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-8">
        <div>
          <input
            placeholder="name@example.com"
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
            className=" w-96 rounded-full px-4 py-4"
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
            className=" w-96 rounded-full px-4 py-4"
          />
        </div>
        <input
          type="submit"
          value="Log in"
          className="w-full hover:cursor-pointer bg-indigo-500 text-white rounded-md font-semibold tracking-wide uppercase py-3 px-6"
        />
      </form>
    </div>
  );
};

export default LoginComponent;
