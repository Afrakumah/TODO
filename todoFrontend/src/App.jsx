import { useEffect, useState } from "react";
import AllTodos from "./components/AllTodos";
import Styles from "./App.module.css";

export default function App() {
  const [task, setTask] = useState("");
  const [alltodos, setAlltodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //   useEffect(() => {
  //     //console.log("todos-----------", alltodos);

  //     const ldata = JSON.parse(localStorage.getItem("tasks"));
  // if (ldata === null) {
  //   setAlltodos([])
  // } else {
  //   setAlltodos(ldata)
  // }
  //     // console.log(ldata);
  //   }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`);

        const results = await response.json();
        //console.log("results", results);
        if (results) {
          setAlltodos(results);
        }
        //setTask('');
      } catch (error) {
        //error handling
        setHasError(true);
        setErrorMessage(error.message);
        console.log("err", error.message);
      }
    };

    fetchData();
  }, [loading]);

  // function handleUpdate(id) {
  //   const updatedTodos = alltodos.map((todo) => {
  //     if (todo.id === id) {
  //       const ldata = JSON.parse(localStorage.getItem("tasks"));
  //       const updateLocal = ldata.map((dt) => {
  //         if (dt.id === id) {
  //           return { ...dt, completed: !dt.completed };
  //         } else {
  //           return dt;
  //         }
  //       });
  //       localStorage.setItem("tasks", JSON.stringify([...updateLocal]));

  //       return { ...todo, completed: !todo.completed };
  //     }
  //      return todo;
  //   });
  //   setAlltodos(updatedTodos);
  // }
  async function handleUpdate(id) {
    try {
      setLoading(true);
      const request = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      setLoading(false);
      //console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  // function handleDelete(id) {
  //   // const newTodos = alltodos.filter((todo) => todo.id !== id);
  //   // setAlltodos(newTodos)

  //   const index = alltodos.findIndex((todo) => todo.id === id);
  //   if (index !== -1) {
  //     const newTodos = [...alltodos];
  //     const del = newTodos.splice(index, 1);
  //     //console.log("deleted", del);
  //     const delId = del[0].id;

  //     const ldata = JSON.parse(localStorage.getItem("tasks"));
  //     const remainingTodos = ldata.filter((dt) => dt.id !== delId);

  //     localStorage.setItem("tasks", JSON.stringify([...remainingTodos]));

  //     setAlltodos(remainingTodos);
  //     // setAlltodos(newTodos);
  //   } else {
  //     return "index does not exist";
  //   }
  // }

  // function addTodo(e) {
  //   e.preventDefault();
  //   if (!task) {
  //     return;
  //   } else {
  //     const todo = {
  //       id: alltodos.length + 1,
  //       chore: task,
  //       completed: false,
  //     };
  //     setAlltodos([...alltodos, todo]);
  //     localStorage.setItem("tasks", JSON.stringify([...alltodos, todo]));

  //     setTask("");
  //   }
  // }

  async function handleDelete(id) {
    try {
      setLoading(true);
      const request = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      setLoading(false);
      //console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function addTodo(e) {
    e.preventDefault();
    const todo = {
      chore: task,
    };

    try {
      setLoading(true);
      const request = await fetch(`${import.meta.env.VITE_API_URL}`, {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTask("");

      const response = await request.json();
      setLoading(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  // if(loading) {
  // return <div style = {{fontSize: '2rem', color: 'red'}}>loading.....</div>
  // }


  //error handling message to frontend
  if (hasError) {
    return (
      <div style={{ fontSize: "2rem", color: "red", textAlign: "center" }}>
        Oops! something went wrong...
        {errorMessage}
      </div>
    );
  }

  return (
    <div className={Styles.app}>
      <form onSubmit={addTodo}>
        <label htmlFor="task" className={Styles.label}>
          Create a task
        </label>
        {""}
        <br />
        <input
          type="text"
          name=""
          id="task"
          placeholder="add a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button style={{ marginLeft: "1rem" }}>Add Task</button>
      </form>

      {loading ? (
        <div style={{ fontSize: "2rem", color: "gold" }}>loading.....</div>
      ) : alltodos.length > 0 ? (
        <AllTodos
          alltodos={alltodos}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      ) : (
        <p>no task to acomplish now, you can add one above</p>
      )}
    </div>
  );
}
