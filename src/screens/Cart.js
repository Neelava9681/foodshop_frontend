import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import trash from "../img/trash.png";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.lenght === 0) {
    return (
      <div className="m-5 w-100 text-center fs-3">The Cart is Empty!!</div>
    );
  }
  let tatalPrice = data.reduce((tatal, food) => tatal + food.price, 0);

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log(userEmail)
    console.log(data)
    const response = await axios.post(
      "https://food-shop-2.onrender.com/api/oderData",
      {
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response", response)
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
    else{
        alert("login again newly")
    }
  };

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn -0">
                    <img
                      src={trash}
                      height="35px"
                      alt="dlt"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price:{tatalPrice}</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
      <div>
    <div style={{position: "fixed", bottom: 0, width: "100%",}}>
        <Footer/>
    </div>
</div>

    </div>
  );
}
