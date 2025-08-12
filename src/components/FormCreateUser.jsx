import "./styles.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createUser } from "../api/user.api";

const FormCreateUser = ({ onCreate, onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { authToken } = useAuth();
  const data = {
    name,
    email,
    username,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(data, authToken);
      onCreate();
    } catch (error) {
      setError("Error al crear el usuario");
      console.error(error.message);
    }
  };

  return (
    <div className="card shadow w-25 mx-auto p-4 m-4 bg">
      <h4 className="mb-3">Crete New User</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            id="username"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="password"
            required
          />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button type="button" onClick={onCancel} className="btn btn-accent">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create User
          </button>
        </div>
      </form>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormCreateUser;
