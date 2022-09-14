import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
function App() {
   const [todos, setTodos] = useState([]);
   useEffect(() => {
      const fetchTasks = async () => {
         let response = await fetch('http://localhost:5000/todo/getall'
         );
         if (response.ok) { // if HTTP-status is 200-299
            // get the task lists
            let json = await response.json();
            setTodos(json);
         } else {
            alert("HTTP-Error: " + response.status);
         }
      }
      fetchTasks();
   }, [])
   return (
      <div className="App">
         <TodoForm addTodo={(todo) => {
            if (todo.task.trim().length > 0) {
               setTodos([...todos, todo]);
            }
         }} />
         <TodoList todos={todos} updateTodos={(list) => { setTodos(list) }}></TodoList>
      </div>
   );
}
export default App;