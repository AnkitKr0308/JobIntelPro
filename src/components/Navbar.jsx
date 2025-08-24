import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetAllJobs, filterJobs } from "../store/jobSlice";
import { logoutUser } from "../store/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countries, cities } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const countryRef = useRef(null);
  const cityRef = useRef(null);

  // fetch all jobs initially
  useEffect(() => {
    dispatch(GetAllJobs());
  }, [dispatch]);

  // filter jobs when filters change
  useEffect(() => {
    dispatch(
      filterJobs({ countries: selectedCountries, cities: selectedCities })
    );
  }, [selectedCountries, selectedCities, dispatch]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (isOpen) return; // don't close in mobile menu
      if (
        countryRef.current?.contains(e.target) ||
        cityRef.current?.contains(e.target)
      ) {
        return;
      }
      setCountryDropdownOpen(false);
      setCityDropdownOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const toggleSelection = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-indigo-600 to-teal-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              JobIntelPro
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {/* Country Filter */}
            <div className="relative" ref={countryRef}>
              <button
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                className="px-3 py-2 rounded-lg bg-white text-gray-700 shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
              >
                🌍 Jobs by Countries
              </button>
              {countryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50 max-h-48 overflow-y-auto">
                  {countries.map((country, idx) => (
                    <label
                      key={`${country}-${idx}`}
                      className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCountries.includes(country)}
                        onChange={() =>
                          toggleSelection(
                            country,
                            selectedCountries,
                            setSelectedCountries
                          )
                        }
                      />
                      <span>{country}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* City Filter */}
            <div className="relative" ref={cityRef}>
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="px-3 py-2 rounded-lg bg-white text-gray-700 shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
              >
                🏙️ Jobs by Cities
              </button>
              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50 max-h-48 overflow-y-auto">
                  {cities.map((city, idx) => (
                    <label
                      key={`${city}-${idx}`}
                      className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(city)}
                        onChange={() =>
                          toggleSelection(
                            city,
                            selectedCities,
                            setSelectedCities
                          )
                        }
                      />
                      <span>{city}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <Link className="text-white hover:text-yellow-300" to="/batch">
              Batch
            </Link>
            <Link className="text-white hover:text-yellow-300" to="/degree">
              Degree
            </Link>
            <Link
              className="text-white hover:text-yellow-300"
              to="/internships"
            >
              Internships
            </Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex gap-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1 border border-white rounded-md text-white hover:bg-white hover:text-indigo-600 transition"
              >
                Logout
              </button>
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
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-700 px-4 py-3 space-y-3">
          {/* Filters */}
          <div>
            <button
              onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
              className="w-full text-left px-3 py-2 rounded-lg bg-white text-gray-700 mb-2"
            >
              🌍 Jobs by Countries
            </button>
            {countryDropdownOpen && (
              <div className="bg-white rounded-lg p-2 max-h-48 overflow-y-auto">
                {countries.map((country, idx) => (
                  <label
                    key={`${country}-${idx}`}
                    className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country)}
                      onChange={() =>
                        toggleSelection(
                          country,
                          selectedCountries,
                          setSelectedCountries
                        )
                      }
                    />
                    <span>{country}</span>
                  </label>
                ))}
              </div>
            )}

            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="w-full text-left px-3 py-2 rounded-lg bg-white text-gray-700 mt-2"
            >
              🏙️ Jobs by Cities
            </button>
            {cityDropdownOpen && (
              <div className="bg-white rounded-lg p-2 max-h-48 overflow-y-auto">
                {cities.map((city, idx) => (
                  <label
                    key={`${city}-${idx}`}
                    className="flex items-center space-x-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCities.includes(city)}
                      onChange={() =>
                        toggleSelection(city, selectedCities, setSelectedCities)
                      }
                    />
                    <span>{city}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <Link className="block text-white hover:text-yellow-300" to="/batch">
            Batch
          </Link>
          <Link className="block text-white hover:text-yellow-300" to="/degree">
            Degree
          </Link>
          <Link
            className="block text-white hover:text-yellow-300"
            to="/internships"
          >
            Internships
          </Link>

          {/* Auth */}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="w-full px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="w-full px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
              >
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
