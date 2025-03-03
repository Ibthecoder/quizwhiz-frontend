import RegBanner from "../../ui/RegBanner";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

function Login() {
  const navigation = useNavigation();
  const loading = navigation.state === "submitting";
  const errMessage = useActionData();

  return (
    <div className="flex">
      <div className="flex h-screen w-1/2 items-center justify-center bg-gray-100">
        <div className="w-[70%] lg:w-[50%]">
          <h1 className="font-cabinSketch mb-10 text-center text-6xl font-semibold">
            Welcome Back
          </h1>
          <Form method="POST" className="font-oxygen" action="/login">
            <div className="mb-5">
              <label htmlFor="email" className="mb-2 block font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="username"
                name="email"
                className="block w-full rounded-md bg-gray-300 px-2 py-2 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="mb-2 block font-semibold">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                min={8}
                autoComplete="current-password"
                className="block w-full rounded-md bg-gray-300 px-2 py-2 focus:outline-none"
              />
            </div>
            <p>{errMessage ? errMessage + "" : ""}</p>
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="block w-full rounded bg-blue-600 py-2 text-white disabled:cursor-wait disabled:bg-blue-300"
                disabled={loading}
              >
                {loading ? "Loading" : "Login"}
              </button>
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t-2 border-black"></div>
                <span>or</span>
                <div className="flex-1 border-t-2 border-black"></div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 w-full rounded bg-blue-600 py-2 text-white disabled:cursor-wait disabled:bg-blue-300"
                disabled={loading}
              >
                <img src="src\assets\images\google.png" alt="Google's logo" className="w-5"  />{" "}
                <span>Login with Google</span>
              </button>
            </div>
          </Form>
          <div className="mt-5 text-center">
            <h3>Already have an account?</h3>
            <Link to="/signup" className="font-semibold text-blue-600">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <RegBanner />
    </div>
  );
}
export default Login;
