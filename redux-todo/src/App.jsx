import { useEffect, useState } from "react";

import Header from "./Header";
import MainDrawer from "./MainDrawer";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchTasks } from "./features/todo/todoSlice";

export default function App() {
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setShowDrawer(!showDrawer);
  };

  return (
    <>
      <Header
        count={tasks.filter((item) => !item.done).length}
        toggleDrawer={toggleDrawer}
      />

      <MainDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />

      <Outlet />
    </>
  );
}
