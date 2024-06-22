import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import axios from "axios";
import img1 from "../img/allFood.jpg"
import img2 from "../img/biriyani.jpg"
import img3 from "../img/starter.webp"

export default function Home() {
  const [search, setsearch] = useState("")
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await axios.post("https://food-shop-2.onrender.com/api/foodData");
      response = response.data;
      // console.log(response[0], response[1])
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.log("failed to load");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          style={{ height: "80vh", overflow: "hidden" }}
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner" id="carousal">
            <div className="carousel-caption" style={{ zIndex: "2" }}>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setsearch(e.target.value)}}
                ></input>
                {/* <button
                  className="btn btn-outline-success test-white bg-success text-light"
                  type="submit"
                >
                  Search
                </button> */}
              </form>
            </div>
            <div className="carousel-item active">
              <img
                src={img1}
                height="560px"
                width="auto"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              ></img>
            </div>
            <div className="carousel-item">
              <img
                src={img2}
                height="560px"
                width="auto"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              ></img>
            </div>
            <div className="carousel-item">
              <img
                src={img3}
                height="560px"
                width="auto"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              ></img>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {foodCat !== null ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-5">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem !== null ? (
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card foodItem = {filterItems}
                            options={filterItems.options[0]}
                  
                          />
                        </div>
                      );
                    })
                ) : (
                  // Render "no data found" message when foodItem is null
                  <div>no data found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>.........</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
