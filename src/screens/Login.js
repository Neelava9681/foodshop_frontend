import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
    console.log(credentials);
  };
  const Navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(credentials);

      const response = await axios.post(
        "https://food-shop-2.onrender.com/api/loginuser",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const json = response.data;
      const authToken= "authToken"

      console.log(json);
      if (!json.success) {
        console.log("enter valid credentials");
      }
      if (json.success) {
        alert("login done");
        localStorage.setItem("userEmail", credentials.email)
        localStorage.setItem("authToken", json.authToken)
        console.log(localStorage.getItem(authToken))
        Navigate("/")
        
      }
    } catch (error) {
      console.error("Error:", error);
      alert("enter valid credensials");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            I'am a new user
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
