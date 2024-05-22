"use client";
const { createContext, useReducer } = require("react");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let MonthlyPlanner = {};
if (typeof window !== "undefined") {
  MonthlyPlanner = JSON.parse(localStorage.getItem("toDo230Monthly")) || {};
}

export const MonthlyContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PLAN":
      const newState = { ...state };
      const month = parseInt(action.payload.month);
      if (state[month] !== undefined) {
        newState[month] = [...newState[month], action.payload];
      } else {
        newState[month] = []; // newState[month].push(action.payload)

        newState[month] = [...newState[month], action.payload];
      }
      localStorage.setItem("toDo230Monthly", JSON.stringify(newState));
      return newState;
    case "DELETE_PLAN":
      const newState1 = { ...state };
      console.log(action);
      const temp=newState1[action.payload.monthInd].filter((ele,i)=>{
        if(action.payload.taskInd!==i){
          return ele;
        }
      })
      if(temp.length>0)
      newState1[action.payload.monthInd]=temp
      else
      delete  newState1[action.payload.monthInd]
      localStorage.setItem("toDo230Monthly", JSON.stringify(newState1));
      return newState1
    default:
      return state;
  }
}

export const MonthlyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, MonthlyPlanner);
  return (
    <MonthlyContext.Provider value={{ Planning: state, dispatch,months }}>
      {children}
    </MonthlyContext.Provider>
  );
};
