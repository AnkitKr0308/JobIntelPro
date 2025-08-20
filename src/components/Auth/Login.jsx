import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../templates/Input";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const errorFromStore = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const loginFields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const login = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));

    if (result.payload?.success) {
      navigate("/"); // redirect after login
    } else {
      setError(result.payload?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-purple-500 mx-auto my-8">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          Login
        </h2>

        {(error || errorFromStore) && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg shadow-sm text-center">
            {error || errorFromStore}
          </div>
        )}

        <form onSubmit={login} className="space-y-6">
          <Input
            fields={loginFields}
            onChange={handleChange}
            formData={formData}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 font-medium underline hover:text-purple-800"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
