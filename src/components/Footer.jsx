import { useState } from "react";
import { subscribeUser } from "../store/subscribeSlice";
import { useDispatch } from "react-redux";

export default function Footer() {
  const [subValue, setSubValue] = useState("");
  const dispatch = useDispatch();
  const [subscribed, setSubscribed] = useState("");

  const handleChange = (e) => {
    setSubValue(e.target.value);
  };

  const handleSubscription = async () => {
    const res = await dispatch(subscribeUser({ email: subValue }));
    if (res.payload?.success) {
      setSubValue("");
      setSubscribed("🎉 Congratulations! You have subscribed to JobIntelPro");

      setTimeout(() => {
        setSubscribed("");
      }, 3000);
    }
  };

  return (
    <>
      {subscribed && (
        <div className="mt-8 fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {subscribed}
        </div>
      )}

      <footer className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white border-t mt-10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:text-yellow-300 transition">
              About Us
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              Privacy Policy
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <a href="#" className="hover:text-yellow-300 transition">
              Contact
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              Terms of Service
            </a>
          </div>

          <div>
            <p className="font-semibold mb-2">Subscribe for Job Updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="border px-3 py-2 rounded-l-md w-full text-black placeholder-gray-500"
                onChange={handleChange}
                value={subValue}
              />

              <button
                onClick={handleSubscription}
                className="bg-yellow-400 text-indigo-800 px-4 rounded-r-md hover:bg-yellow-500 transition"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
