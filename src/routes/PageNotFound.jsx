import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className=" w-screen h-screen grid place-items-center">
      <h1 className="text-4xl">
        404 Page Not Found{" "}
        <Link to={"/"} className="underline text-indigo-500">
          Go to home page
        </Link>
      </h1>
    </div>
  );
}

export default PageNotFound;
