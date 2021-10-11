import React, { useEffect, useState } from "react";

//?ICONS
import { BiPlus, BiEditAlt } from "react-icons/bi";

//?COMPONENTS
import Button from "../buttons/Button";
import InputBox from "../inputs/InputBox";

function Form({ todo, setTodo, todos, setTodos }) {
  const [formState, setFormState] = useState({
    submitIcon: <BiPlus />,
  });
  useEffect(() => {
    if (todo.index !== 0) {
      setFormState({
        ...formState,
        submitIcon: <BiEditAlt />,
      });
    } else {
      setFormState({
        ...formState,
        submitIcon: <BiPlus />,
      });
    }
    // eslint-disable-next-line
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.title !== "") {
      if (todo.index !== 0) {
        //?update
        for (let i = 0; i < todos.length; i++) {
          let x = todos[i];
          if (x.index === todo.index) {
            todos[i].title = todo.title;
          }
        }
      } else {
        //?create
        setTodos([...todos, { title: todo.title, completd: false }]);
      }
      setTodo({
        index: 0,
        title: "",
        completed: false,
      });
    }
  };
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <InputBox
        cName="input-primary"
        placeholder="...enter your todo here"
        value={todo}
        setValue={setTodo}
      />
      <Button
        cName="btn-primary"
        icon={formState.submitIcon}
        handleClick={handleSubmit}
      />
    </form>
  );
}

export default Form;
