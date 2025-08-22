import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../templates/Input";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../store/authSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const errorFromStore = useSelector((state) => state.auth.error);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const signupFields = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      required: true,
    },
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
    {
      id: "contact",
      label: "Contact",
      type: "text",
      placeholder: "Enter contact number",
      required: true,
    },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError("");
  };

  const signup = async (e) => {
    e.preventDefault();
    const payload = { ...formData, role: "User" };
    console.log(payload);
    const result = await dispatch(signupUser(payload));

    if (result.payload?.success) {
      navigate("/");
    } else {
      setError(result.payload?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-purple-500 mx-auto my-8">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          Sign Up
        </h2>

        {(error || errorFromStore) && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg shadow-sm text-center">
            {error || errorFromStore}
          </div>
        )}

        <form onSubmit={signup} className="space-y-6">
          <Input
            fields={signupFields}
            onChange={handleChange}
            formData={formData}
          />

          {/* Gender Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex justify-between items-center px-4 py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 focus:outline-none"
            >
              {formData.gender || "Select Gender"}
              <svg
                className="w-3 h-3 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <ul className="absolute w-full bg-white border rounded-md shadow mt-1 z-10">
                {["Male", "Female", "Others"].map((gender) => (
                  <li key={gender}>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, gender }));
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-purple-100"
                    >
                      {gender}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition duration-300"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-medium underline hover:text-purple-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
