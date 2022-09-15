import React, { useState } from 'react';

function TodoForm({ addTodo }) {
    const [userInput, setUserInput] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        if (!userInput) return;
        await postData('http://localhost:5000/todo/create',
            { complete: false, task: userInput })
            .then(data => {
                addTodo(data);
                setUserInput("");
            })
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                placeholder="New Task"
                type="text"
                className="input"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
            />
        </form>
    );
};

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
    });
    return response.json();
 }

export default TodoForm;