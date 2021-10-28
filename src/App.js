import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  console.log(users);

  const idRef = useRef("");
  const nameRef = useRef("");
  const emailRef = useRef("");
  const salaryRef = useRef("");
  const locationRef = useRef("");

  const handleAddUser = (e) => {
    const id = idRef.current.value;
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const salary = salaryRef.current.value;
    const location = locationRef.current.value;

    // console.log(id, name, email, salary, location);
    const newData = {
      id: id,
      name: name,
      email: email,
      salary: salary,
      location: location,
    };

    fetch("http://localhost:5000/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        const addUser = data;
        console.log(addUser);
        const allUser = [...users, addUser];
        setUsers(allUser);
      });

    idRef.current.value = "";
    nameRef.current.value = "";
    emailRef.current.value = "";
    salaryRef.current.value = "";
    locationRef.current.value = "";

    //send data to the server:
    e.preventDefault();
  };
  const handleSubmit = () => {
    console.log("User added");
    // console.log(id, name, email, salary, location);
  };

  return (
    <div className="App">
      <h2>found: {users.length}</h2>
      <form onSubmit={handleAddUser}>
        Id: <input type="text" ref={idRef} name="" id="" />
        <br />
        name: <input type="text" ref={nameRef} name="" id="" />
        <br />
        email: <input type="email" ref={emailRef} name="" id="" />
        <br />
        salary: <input type="text" ref={salaryRef} name="" id="" />
        <br />
        location: <input type="text" ref={locationRef} name="" id="" />
        <br />
        <br />
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            id: {user.id}
            name: {user.name}
            email: {user.email}
            salary:{user.salary}
            location:{user.location}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
