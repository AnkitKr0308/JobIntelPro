import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  GetCities,
  GetCountries,
  // filterJobs,
  getAllJobs,
  searchJobs,
  setFilters,
} from "../store/jobSlice";
import { logoutUser } from "../store/authSlice";
// import { fetchSearchJobs } from "../api/jobsAPI";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countries, cities } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const countryRef = useRef(null);
  const cityRef = useRef(null);

  useEffect(() => {
    dispatch(GetCountries());
    // dispatch(GetCities());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCountries.length > 0) {
      dispatch(GetCities(selectedCountries));
    } else {
      dispatch(GetCities([]));
      setSelectedCities([]);
    }
  }, [selectedCountries, dispatch]);

  useEffect(() => {
    if (
      searchValue.trim() === "" &&
      selectedCountries.length === 0 &&
      selectedCities.length === 0
    ) {
      dispatch(getAllJobs());
    } else {
      dispatch(
        searchJobs({
          query: searchValue,
          countries: selectedCountries,
          cities: selectedCities,
        })
      );
    }
  }, [searchValue, selectedCountries, selectedCities, dispatch]);

  useEffect(() => {
    dispatch(
      setFilters({
        countries: selectedCountries,
        cities: selectedCities,
        search: searchValue,
      })
    );
  }, [selectedCountries, selectedCities, searchValue, dispatch]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (isOpen) return;
      if (
        countryRef.current?.contains(e.target) ||
        cityRef.current?.contains(e.target)
      )
        return;
      setCountryDropdownOpen(false);
      setCityDropdownOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          <div className="hidden md:flex items-center gap-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />

            {/* Job Roles / Countries Dropdown */}
            <div className="relative" ref={countryRef}>
              <button
                onClick={() => {
                  setCountryDropdownOpen(!countryDropdownOpen);
                  if (!countryDropdownOpen) setCityDropdownOpen(false); // close city dropdown
                }}
                className="px-3 py-2 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
              >
                Jobs by Countries
              </button>
              {countryDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50 max-h-48 overflow-y-auto">
                  {selectedCountries.length > 0 && (
                    <button
                      onClick={() => setSelectedCountries([])}
                      className="w-full text-left px-2 py-1 mb-2 text-red-500 hover:bg-gray-100 rounded"
                    >
                      Clear All
                    </button>
                  )}
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

            {/* City Filter Dropdown */}
            <div className="relative" ref={cityRef}>
              <button
                onClick={() => {
                  setCityDropdownOpen(!cityDropdownOpen);
                  if (!cityDropdownOpen) setCountryDropdownOpen(false); // close country dropdown
                }}
                className="px-3 py-2 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
              >
                Jobs by Cities
              </button>
              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50 max-h-48 overflow-y-auto">
                  {selectedCities.length > 0 && (
                    <button
                      onClick={() => setSelectedCities([])}
                      className="w-full text-left px-2 py-1 mb-2 text-red-500 hover:bg-gray-100 rounded"
                    >
                      Clear All
                    </button>
                  )}
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
    </nav>
  );
}
