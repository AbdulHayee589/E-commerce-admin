import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../state/index";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [reg, setReg] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleregsubmit = async (e) => {
    e.preventDefault();
    const registrationData = {
      name: name,
      email: email,
      password: password,
    };
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      }
    );
    const savedUser = await savedUserResponse.json();
    console.log({ savedUser });
    setName("");
    setEmail("");
    setPass("");

    if (savedUser) {
      setReg(false);
    }
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const values = {
      email: email,
      password: password,
    };

    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!loggedInResponse.ok) {
      // Handle the error, e.g., by logging it or showing an error message.
      console.error(
        "Login request failed with status: " + loggedInResponse.status
      );
      return;
    }
    const loggedIn = await loggedInResponse.json();
    console.log({ loggedIn });

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      setEmail("");
      setPass("");
      navigate("/dashboard");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {reg === false && (
        <div className="border border-1 rounded p-3 ">
          <form className="form row-md-3 mt-2 " onSubmit={handlelogin}>
            <div className="form-group">
              <b>Email:</b>

              <input
                title="Enter Email"
                type="email"
                className="form-control my-2"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group ">
              <b>Password:</b>
              <input
                title="Enter Password"
                type="password"
                className="form-control my-2 "
                placeholder="Enter Password"
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                title="Login"
                type="submit"
                onClick={handlelogin}
                className="btn mt-4 btn-primary btn-block form-control"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-3 justify-content-center d-flex flex-column align-items-center">
            <p> Not a user?</p>
            <button
              title="Register?"
              onClick={() => setReg(true)}
              className="btn btn-secondary btn-block form-control"
            >
              Register
            </button>
          </div>
        </div>
      )}
      {reg === true && (
        <div className="border border-1 rounded p-3 ">
          <form className="form col-md-12 mt-2  " onSubmit={handleregsubmit}>
            <div className="form-group">
              <b>Name:</b>
              <input
                title="Enter Name"
                type="text"
                className="form-control my-2"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <b>Email:</b>
              <input
                title="Enter Email"
                type="email"
                className="form-control my-2"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group ">
              <b>Password:</b>
              <input
                title="Enter Password"
                type="password"
                className="form-control my-2 "
                placeholder="Enter Password"
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>

            <div>
              <button
                title="Register"
                type="submit"
                onClick={handleregsubmit}
                className="btn btn-primary btn-block form-control"
              >
                Register
              </button>
            </div>
          </form>
          <button
            title="Login?"
            onClick={() => navigate("/admin/register")}
            className="btn btn-secondary btn-block form-control mt-3"
          >
            Register as admin?
          </button>
          <div className="mt-3 justify-content-center d-flex flex-column align-items-center">
            <p> Already a user?</p>
            <button
              title="Login?"
              onClick={() => setReg(false)}
              className="btn btn-secondary btn-block form-control"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
