import React, { useEffect, useState } from 'react';
import './App.css';

import client from "./api/client";


const UserForm = (props) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await client.post("/users", form)
    
    if(props.onSubmit) props.onSubmit()

    console.log(form)
  }

  return (
    <form onSubmit={handleSubmit}>
      first name
      <input
        type="text"
        name="firstName"
        onChange={handleChange}
        value={form.firstName} />
      last name
      <input
        type="text"
        name="lastName"
        onChange={handleChange}
        value={form.lastName} />
      <button>add person</button>
    </form>
  )
}


const UserList = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await client.get("/users");

    setUsers(response.data);

  }
  const handleDelete = async (_id) => {
    const response = await client.delete("/users/" + _id)

    console.log(response.data)
    await getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <UserForm onSubmit={getUsers} />
      <div key="user.id" className="Users">
        {users.map((user) => (
          <div key={user._id}>
            {user.firstName} {user.lastName}
            <button
              onClick={() => handleDelete(user._id)}>delete
            </button>
          </div>
        ))}
      </div>

    </>
  )
}


function App() {
  return (
    <>
      <div>People list!</div>
      <UserList />

    </>
  );
}

export default App;
