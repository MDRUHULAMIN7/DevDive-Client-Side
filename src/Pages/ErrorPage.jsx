import Lottie from "lottie-react";
import { Link, useRouteError } from "react-router-dom";
import Error from "../../public/AnimationCatError.json";
import { Helmet } from "react-helmet";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page" className="bg-slate-50 h-[100vh] pt-20">
      <Helmet>
          <title>DevDive | Page Not Found</title>
      </Helmet>
      <h2 className="text-4xl font-semibold text-center ">
        Sorry! Page Not Found
      </h2>
      <div className="w-1/4 mx-auto h-1/2 mt-10">
        <Lottie animationData={Error} />;
      </div>
      <p className="text-center my-5">
        <span>
          Error Type : <i>{error.statusText || error.message}</i>
        </span>
      </p>
      <div className="flex justify-center">
        <Link to={"/"}>
          <button className="btn bg-lime-500 text-white">Return Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
