import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((t) => t.id === editId);
      const updatedTodo = todos.map((t) => 
        t.id === editTodo.id ? (t = { id: t.id, todo }) : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodo);
      setEditId(0);
      setTodo('');
      return
    }
    if (todo !== "")
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
    setTodo("");
  };
  const handleDelete = (id) => {
    const filteredTodo = todos.filter((t) => t.id !== id);
    setTodos([...filteredTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((t) => t.id == id);
    console.log(editTodo);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="app">
      <div className="container">
        TODO List App
        <form className="FormTodo" onSubmit={handleSubmit}>
          <input
            className="inputBox"
            type="text"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <button className="btn">{editId
          ?"Edit":"GO"}</button>
        </form>
        <ul>
          {todos.map((t) => {
            return (
              <li className="allTodos">
                <span className="singleTodo" key={t.id}>
                  {t.todo}
                </span>
                <button
                  className="btn"
                  onClick={() => {
                    handleEdit(t.id);
                  }}
                >
                  Edit
                </button>
                <button className="btn" onClick={() => handleDelete(t.id)}>
                  delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
