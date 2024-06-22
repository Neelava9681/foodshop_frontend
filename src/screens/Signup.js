import React, { useState } from "react";
import axios from 'axios';
import "../screens/Signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";







export default function Signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const Navigate = useNavigate()

  // useEffect(() => {
  //   console.log(credentials);
  // }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:6000/api/createuser", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         name: credentials.name,
//         email: credentials.email,
//         password: credentials.password,
//         location: credentials.location,
//       }),
//     });
//     const json = await response.json();
//     console.log(json);
  
//     if (!json.success) {
//       alert("enter valid credentials");
//     }
//   };



const onChange = (event) => {
  setcredentials({ ...credentials, [event.target.name]: event.target.value });
  console.log(credentials)
};

const handleSubmit = async (e) => {
    try {
        e.preventDefault();

        const response = await axios.post("https://food-shop-2.onrender.com/api/createuser", {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.location,
        },
         {
            headers: {
                "Content-Type": "application/json"
            }
        });
        

        if (!response.data.success) {
            alert("Enter valid credentials");

        } else {
            console.log(response.data);
            Navigate("/login")
            
        }
    } catch (error) {
        console.error("Error:", error);
        // Handle error appropriately, e.g., show a user-friendly message
        alert("An error occurred. Please try again later.");
    }
    
};

  
  


  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Name
            </label>
            <input
              type="string"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label  className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label  className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label  className="form-label">
              Location
            </label>
            <input
              type="string"
              className="form-control"
              name="location"
              value={credentials.location}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
}
