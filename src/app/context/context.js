"use client";
const { createContext, useReducer } = require("react");

let toDoArr = {};
if (typeof window !== "undefined") {
  toDoArr = JSON.parse(localStorage.getItem("toDo230")) || {
    today: [],
    previous: [],
    tomorrow: [],
  };
  const date = new Date();
  if (toDoArr.today[0] !== undefined) {
    if (toDoArr.today[0].year < date.getFullYear()) {
      const prev = toDoArr.previous;
      let today = toDoArr.today;
      today = today.filter((ele) => {
        if (!ele.completed) return ele;
      });
      toDoArr.previous = [...prev, ...today];
      toDoArr.today = [];
    } else {
      if (toDoArr.today[0].month < date.getMonth()) {
        const prev = toDoArr.previous;
        let today = toDoArr.today;
        today = today.filter((ele) => {
          if (!ele.completed) return ele;
        });
        toDoArr.previous = [...prev, ...today];
        toDoArr.today = [];
      } else {
        if (toDoArr.today[0].day < date.getDate()) {
          const prev = toDoArr.previous;
          let today = toDoArr.today;
          today = today.filter((ele) => {
            if (!ele.completed) return ele;
          });
          toDoArr.previous = [...prev, ...today];
          toDoArr.today = [];
        }
      }
    }
  }

  if (toDoArr.tomorrow[0] !== undefined) {
    const date = new Date();
    if (toDoArr.tomorrow[0].day == date.getDate()) {
      toDoArr.today = toDoArr.tomorrow;
      toDoArr.tomorrow = [];
    } else if (toDoArr.tomorrow[0].year < date.getFullYear()) {
      if (toDoArr.tomorrow[0].month < date.getMonth()) {
        toDoArr.today = [];
        const prev = toDoArr.previous;
        toDoArr.previous = [...prev, ...toDoArr.tomorrow];
        toDoArr.tomorrow = [];
      } else {
        if (toDoArr.tomorrow[0].day < date.getDate()) {
          toDoArr.today = [];
          const prev = toDoArr.previous;
          toDoArr.previous = [...prev, ...toDoArr.tomorrow];
          toDoArr.tomorrow = [];
        }
      }
    }
  }
  localStorage.setItem("toDo230", JSON.stringify(toDoArr));
} else {
  toDoArr = { today: [], previous: [], tomorrow: [] };
}

export const DailyContext = createContext();

function reducer(state, action) {
  try {
    switch (action.type) {
      case "ADD_TASK_TODAY":
        const newState = { ...state, today: [...state.today, action.payload] };
        localStorage.setItem("toDo230", JSON.stringify(newState));
        return newState;
      case "ADD_TASK_TOMORROW":
        const newState1 = {
          ...state,
          tomorrow: [...state.tomorrow, action.payload],
        };
        localStorage.setItem("toDo230", JSON.stringify(newState1));
        return newState1;
      case "MOVE_TO_TODAY":
        let newState2 = state;
        if (action.payload.comingFrom == "previous") {
          // console.log("Hello");
          let today = state.today;
          let prev = state.previous;
          const task = prev[action.payload.index];
          const date = new Date();
          task.day = date.getDate();
          task.month = date.getMonth();
          task.year = date.getFullYear();
          today = [...today, task];
          prev = prev.filter((ele, i) => {
            if (i != action.payload.index) return ele;
          });
          newState2 = { ...newState2, today: today, previous: prev };
        } else {
          let today = state.today;
          let tom = state.tomorrow;
          const task2 = tom[action.payload.index];
          const date = new Date();
          task2.day = date.getDate();
          task2.month = date.getMonth();
          task2.year = date.getFullYear();
          today = [...today, task2];
          tom = tom.filter((ele, i) => {
            if (i != action.payload.index) return ele;
          });
          newState2 = { ...newState2, today: today, tomorrow: tom };
        }
        localStorage.setItem("toDo230", JSON.stringify(newState2));
        return newState2;
      case "DELETE":
        let newState3 = state;
        if (action.payload.comingFrom == "previous") {
          let prev = state.previous;
          prev = prev.filter((ele, i) => {
            if (i != action.payload.index) return ele;
          });
          newState3 = { ...newState3, previous: prev };
        } else if (action.payload.comingFrom == "today") {
          let today = state.today;
          today = today.filter((ele, i) => {
            if (i != action.payload.index) return ele;
          });
          newState3 = { ...newState3, today: today };
        } else {
          let tomorrow = state.tomorrow;
          tomorrow = tomorrow.filter((ele, i) => {
            if (i != action.payload.index) return ele;
          });
          newState3 = { ...newState3, tomorrow: tomorrow };
        }
        localStorage.setItem("toDo230", JSON.stringify(newState3));
        return newState3;
      case "TASK_COMPLETED":
        let newState4 = state;
        // newState4.today[action.payload.index].completed=true;
        const today = state.today;
        today[action.payload.index].completed = true;
        newState4 = { ...newState4, today: today };
        localStorage.setItem("toDo230", JSON.stringify(newState4));
        return newState4;
      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
}

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, toDoArr);
  return (
    <DailyContext.Provider value={{ toDoArr: state, dispatch }}>
      {children}
    </DailyContext.Provider>
  );
};
