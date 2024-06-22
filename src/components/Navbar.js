import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

export default function Navbar() {
  let data = useCart();
  const[cartView, setCartView] = useState(false)
  const navigate = useNavigate();

  const handelLogout = () => {
    const result = window.confirm("Do you sure to do logout");
    if (result) {
      localStorage.removeItem("authToken");
      console.log(localStorage);
      navigate("/");
    } else {
      alert("You clicked No!");
    }
    localStorage.removeItem("authToken");
    console.log(localStorage);
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid ">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            <b>SayEat!</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            style={{ display: "flex", justifyContent: "right" }}
          >
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-Link active"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "8px",

                    transition: "background-color 0.3s ease",
                    fontWeight: "30px",
                  }}
                  aria-current="page"
                  to="/"
                >
                  <b> Home</b>
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-Link active"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      padding: "8px 12px",
                      borderRadius: "8px",

                      transition: "background-color 0.3s ease",
                      fontWeight: "30px",
                    }}
                    aria-current="page"
                    to="/myOrder"
                  >
                    <b>My Oders</b>
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div>
                <Link className="btn bg-white text-success mx-1" to="/login">
                  <b>Login</b>
                </Link>

                <Link className="btn bg-white text-success mx-1" to="/signup">
                  <b>Signup</b>
                </Link>
              </div>
            ) : (
              <>
              <Link to="/cart">
                <div className="btn bg-white text-success mx-2" onClick={() => {
                    setCartView(true);
                  }}>
                   My Cart {" "}
                   <Badge pill bg="danger">{data.length}</Badge>
                  </div>
              </Link>
                  {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:""}
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={handelLogout}
                >
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
