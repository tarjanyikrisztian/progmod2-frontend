import React from "react";
import Cookies from "universal-cookie";
import ErrorAlert from "../components/ErrorAlert";
import FormInput from "../components/FormInput";

const Login: React.FC = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const onClick = async () => {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const res = await response.json();

    if (response.status === 200) {
      setError(false);
      const cookies = new Cookies();
      cookies.set("token", res.data, {
        sameSite: "none",
      });
      window.location.href = "/books";
    } else {
      setError(true);
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content max-w-max flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:ml-10">
          <h1 className="text-5xl font-bold">Library management system</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            {error && <ErrorAlert message={errorMsg} />}
            <FormInput
              type="text"
              label="Username"
              placeholder="johndoe"
              value={username}
              onChange={setUsername}
            />
            <FormInput
              type="password"
              label="Password"
              placeholder="*********"
              value={password}
              onChange={setPassword}
            />
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  onClick();
                }}
              >
                Login
              </button>
            </div>
            <label className="label">
              <a href="/register" className="label-text-alt link link-hover">
                Don't have an account yet?
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
