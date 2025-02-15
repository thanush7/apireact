import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [formData, setFormData] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // Fetch form data from API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_URL, newUser)
      .then((response) => {
        setFormData([...formData, response.data]);
        setNewUser({ name: '', email: '' });
      })
      .catch((error) => console.error('Error adding data:', error));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Form Details</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New User</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
    </div>
  );
};

export default App;
