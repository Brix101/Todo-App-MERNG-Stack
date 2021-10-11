import React from "react";

//?ICONS
import { BiEdit, BiTrash, BiCheck, BiX } from "react-icons/bi";

//?COMPONENTS
import Button from "../buttons/Button";

function Todo({ index, todo, setTodo, setTodos, todos }) {
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Update:", todo.id);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    console.log("Delete:", todo.id);
  };
  const handleCompletion = (e) => {
    e.preventDefault();
    console.log("Completion:", todo.id);
  };
  return (
    <div className={todo.completed ? "Todo completed" : "Todo"}>
      <p className="todo-title">{todo.todo}</p>
      <div className="todo-buttons">
        <Button
          icon={todo.completed ? <BiX /> : <BiCheck />}
          cName="btn-primary"
          handleClick={handleCompletion}
        />
        <Button
          icon={<BiEdit />}
          cName="btn-secondary"
          handleClick={handleUpdate}
        />
        <Button
          icon={<BiTrash />}
          cName="btn-danger"
          handleClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default Todo;
