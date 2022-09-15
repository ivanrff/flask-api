//TodoList
import React from 'react';

function TodoList({ todos, updateTodos }) {

    const removeTask = async (index, todo) => {
        await deleteData('http://localhost:5000/todo/delete',
           todo)
           .then(data => {
              const updatedList = todos.filter((task, taskIndex) => {
                 return taskIndex !== index;
              });
              updateTodos(updatedList);
           })
    }

    async function deleteData(url = '', data = {}) {
        const response = await fetch(url, {
           method: 'DELETE',
           headers: {
              'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
        });
        return response.json();
     }

    const markComplete = async (index, todo) => {
        const updated = { ...todo, complete: !todo.complete }
        await updateData('http://localhost:5000/todo/update',
           updated)
           .then(data => {
              const updatedList = todos.map((item, id) => {
                 if (index !== id) return item;
                 return updated;
              });
              updateTodos(updatedList);
           })
    }

    async function updateData(url = '', data = {}) {
        const response = await fetch(url, {
           method: 'PUT',
           headers: {
              'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
        });
        return response.json();
     }

    return (

        <div className="todo-list">
            {todos.map((todo, index) => (
                <div key={index}>
                    <div
                        className={`todo ${todo.complete ? "taskDone" : ""}`}
                        onClick={() => markComplete(index, todo)}>  
                        Item {index + 1}: {todo.task}
                    </div>
                    <button className="button" onClick={() => removeTask(index, todo)}>Delete</button>

                </div>

            ))}
        </div>
    );
};

export default TodoList;