import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../store/auth/authSlice";

const RegisterComponent = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const { first_name, last_name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div>
            <input
              required
              placeholder="Name"
              type="text"
              name="first_name"
              value={first_name}
              onChange={(e) => onChange(e)}
              className=" w-44 rounded-full px-4 py-4"
            />
          </div>
          <div>
            <input
              required
              placeholder="Surname"
              type="text"
              name="last_name"
              value={last_name}
              onChange={(e) => onChange(e)}
              className=" w-44 rounded-full px-4 py-4"
            />
          </div>
        </div>
        <div>
          <input
            required
            placeholder="name@example.com"
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            className=" w-96 rounded-full px-4 py-4"
          />
        </div>
        <div>
          <input
            required
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            className=" w-96 rounded-full px-4 py-4"
          />
        </div>
        <button
          type="submit"
          className="w-full  hover:cursor-pointer bg-indigo-500 text-white rounded-md font-semibold tracking-wide uppercase py-3 px-6"
        >
          Register
        </button>
        <p className="text-white flex gap-4">
          <input
            type="checkbox"
            name="remeber"
            id="remember"
            className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            required
          />
          <span>
            I agree to{" "}
            <span className="underline text-indigo-500">
              Terms and Conditions
            </span>
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterComponent;
