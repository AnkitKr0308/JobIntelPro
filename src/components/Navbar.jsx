import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get logged-in user from Redux
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-teal-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">JobIntelPro</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-white">
            <Link className="hover:text-yellow-300 transition" to="/countries">
              Jobs by Countries
            </Link>
            <Link className="hover:text-yellow-300 transition" to="/cities">
              Jobs by Cities
            </Link>
            <Link className="hover:text-yellow-300 transition" to="/batch">
              Batch
            </Link>
            <Link className="hover:text-yellow-300 transition" to="/degree">
              Degree
            </Link>
            <Link
              className="hover:text-yellow-300 transition"
              to="/internships"
            >
              Internships
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">
                  Hello, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 border border-white rounded-md text-white hover:bg-white hover:text-indigo-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-1 border border-white rounded-md text-white hover:bg-white hover:text-indigo-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-1 border border-white rounded-md text-white hover:bg-white hover:text-indigo-600 transition"
                >
                  Signup
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gradient-to-r from-indigo-600 to-teal-500">
          <Link
            className="block text-white hover:text-yellow-300 transition"
            to="/countries"
          >
            Jobs by Countries
          </Link>
          <Link
            className="block text-white hover:text-yellow-300 transition"
            to="/cities"
          >
            Jobs by Cities
          </Link>
          <Link
            className="block text-white hover:text-yellow-300 transition"
            to="/batch"
          >
            Batch
          </Link>
          <Link
            className="block text-white hover:text-yellow-300 transition"
            to="/degree"
          >
            Degree
          </Link>
          <Link
            className="block text-white hover:text-yellow-300 transition"
            to="/internships"
          >
            Internships
          </Link>

          {/* Mobile Auth Buttons */}
          <div className="flex gap-3 mt-2 flex-col">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1 border border-white rounded-md w-full text-white hover:bg-white hover:text-indigo-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-1 border border-white rounded-md w-full text-white hover:bg-white hover:text-indigo-600 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-1 border border-white rounded-md w-full text-white hover:bg-white hover:text-indigo-600 transition"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
