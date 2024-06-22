import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const res = await axios.post(
        "https://food-shop-2.onrender.com/api/myOrderData",
        {
          email: localStorage.getItem("userEmail"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", res.data);
      setOrderData(res.data.orderData.order_data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const renderOrderItem = (item) => {
    if (item.Oder_date) {
      return (
        <div className="m-auto mt-5" key={item.Oder_date}>
          <div>{item.Oder_date}</div>
          <hr />
        </div>
      );
    } else {
      return (
        <div className="col-12 col-md-6 col-lg-3" key={item.id}>
          <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <div className="container w-100 p-0" style={{ height: "38px" }}>
                <span className="m-1">{item.qty}</span>
                <span className="m-1">{item.size}</span>
                <div className="d-inline ms-2 h-100 w-20 fs-5">
                  ₹{item.price}/-
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {Array.isArray(orderData) && orderData.length > 0 ? (
            orderData.slice(0).reverse().map((item, idx) => (
              <React.Fragment key={idx}>
                {Array.isArray(item) ? (
                  item.map((subItem, subIdx) => renderOrderItem(subItem))
                ) : (
                  renderOrderItem(item)
                )}
              </React.Fragment>
            ))
          ) : (
            <div>No orders found</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
