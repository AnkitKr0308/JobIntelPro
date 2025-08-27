import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { clearError } from "./store/uiSlice";

function App() {
  const globalError = useSelector((state) => state.ui?.globalError);

  const dispatch = useDispatch();

  return (
    <div className="App">
      <Navbar />

      {globalError && (
        <div
          className="bg-red-600 text-white text-center py-2 fixed top-16 w-full z-50 cursor-pointer"
          onClick={() => dispatch(clearError())}
        >
          {globalError}
        </div>
      )}

      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
