import React, { useState } from "react";

import { useQuery } from "@apollo/client";

import LogOutBtn from "../buttons/LogOutBtn";
import Form from "../form/Form";
import Todos from "../lists/Todos";
import { GET_ALL_TODOS } from "../../graphql/queries/Todo";

function Home() {
  const { data, error, loading, refetch } = useQuery(GET_ALL_TODOS);

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    index: 0,
    title: "",
    completed: false,
  });

  if (error) {
    console.log(error);
  }
  useState(() => {
    console.log("todo: ", !todos);
    console.log(data == null);
    if (data != null) {
      setTodos(data.getTodos);
    } else {
      refetch();
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="modal">
          <div className="loading"></div>
        </div>
      )}
      <div className="app-bg bg-float">
        <div className="upper-form">
          <h1 className="app-title">Todo App</h1>
          <button onClick={() => refetch()}>Refetch!</button>
          <LogOutBtn />
        </div>
        <hr />
        <Form todo={todo} setTodo={setTodo} todos={todos} setTodos={setTodos} />
        <hr />
        <Todos todos={todos} setTodos={setTodos} setTodo={setTodo} />
      </div>
    </>
  );
}

export default Home;
