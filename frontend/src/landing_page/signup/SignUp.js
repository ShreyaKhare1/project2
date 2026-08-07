import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://project2-frjx.onrender.com/signup",
        formData
      );

      if (res.data.success) {
        setUser(res.data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response.data.message || "Signup failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">SignUp</h2>
    <form onSubmit={handleSignup}>
      <div className="mb-3">
        <input
        type="text"
        className="form-control"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      </div>

      <div className="mb-3">
        <input
        type="email"
        className="form-control"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      </div>

      <div className="mb-3">
        <input
        type="password"
        className="form-control"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      </div>

      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
    </div>
    </div>
  );
}

export default SignUp;
