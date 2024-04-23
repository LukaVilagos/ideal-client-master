import { Link, NavLink } from "react-router-dom";
import RegisterButton from "../components/layout/buttons/RegisterButton";
import Logo from "../imgs/logo.svg";

function Home() {
  return (
    <div className="w-screen h-screen relative">
      <header className="flex justify-center flex-col items-center pt-16">
        <Link to="/">
          <img src={Logo} alt="logo" className="mb-16 w-full max-w-xl px-4" />
        </Link>

        <div className="flex justify-center gap-16">
          <NavLink to="/login">
            <RegisterButton>login</RegisterButton>
          </NavLink>
          <NavLink to="/register">
            <RegisterButton>Register</RegisterButton>
          </NavLink>
        </div>
      </header>
      <main className="grid place-items-center pt-16 w-full px-2">
        <h1 className="text-6xl mb-8 font-extrabold text-gray-900">
          <span className="text-gray-900">Work Reports made Easy</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-md">
          <span className="text-gray-900">
            Create Templates for your workers to quickly make work Reports on
            location using our intuitive Creator tool. View your own personal
            Database and export Reports to the PDF format. Enjoy all the free
            time gained by using Ideal in your bussiness.
          </span>
        </p>
      </main>
    </div>
  );
}

export default Home;
