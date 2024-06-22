import React, { createContext, useReducer } from "react";
import { useContext } from "react";

const cartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        }];
    case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.index, 1)
      return newArr;
    case "DROP":
      let empArray = []
      return empArray
    case "UPDATE":
      let arr = []
      arr.find((food, index) => {
        if (food.id === action.id){
          console.log(food.qty, parseInt(action.qyt), action.price + food.price);
          arr[index] = {...food, qyt: parseInt(action.qyt) +food.qyt,  price: action.price + food.price}
        }
        return arr
      })
      return arr
    default:
      console.log("error in reducer");
  }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
  
    return (
      <>
        <CartDispatchContext.Provider value={dispatch}>
          <cartStateContext.Provider value={state}>
            {children}
          </cartStateContext.Provider>
        </CartDispatchContext.Provider>
      </>
    );
  };
  

export const useCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
