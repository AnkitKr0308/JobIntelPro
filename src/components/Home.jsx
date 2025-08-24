import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllJobs } from "../store/jobSlice";
import JobList from "../components/Jobs/JobList";
import AdCard from "../templates/AdCard";

export default function Home() {
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(GetAllJobs());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 🔹 Fixed Top Banner Ad */}
      <div className="fixed top-[64px] left-0 w-full z-40 bg-gray-50/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <AdCard
            size="banner"
            className="rounded-2xl shadow-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
          />
        </div>
      </div>

      {/* 🔹 Page Content (pushed down so it doesn’t overlap ad) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto px-6 pt-[160px] mt-[10vh]">
        {/* Main Content */}
        <div className="lg:col-span-9">
          <h1 className="text-3xl font-bold mb-6">Latest Jobs</h1>
          <JobList jobs={jobs} adFrequency={6} jobsPerPage={90} />
        </div>

        {/* Sidebar Ad */}
        <div className="hidden lg:flex lg:col-span-3 justify-center">
          <div className="sticky top-32 h-[600px] w-full">
            <AdCard
              size="large"
              className="h-full w-full rounded-xl shadow-lg bg-gradient-to-b from-green-400 to-teal-500 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
