import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../templates/JobCard";
import AdCard from "../templates/AdCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GetAllJobs } from "../store/jobSlice";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      const jobData = await dispatch(GetAllJobs());
      if (jobData.payload?.success) {
        setJobs(jobData.payload.data.jobs || []);
      }
    };
    fetchJobs();
  }, [dispatch]);

  return (
    <>
      <Navbar />

      {/* Top Banner Ad */}
      <div className="sticky top-16 z-40 max-w-7xl mx-auto px-6 mt-2">
        <AdCard
          size="banner"
          className="rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <h2 className="text-3xl font-extrabold text-indigo-700 mt-10 mb-6">
          Latest Jobs
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Job Cards */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[minmax(0,1fr)]">
            {jobs.slice(0, 40).map((job, idx) => (
              <JobCard
                key={idx}
                title={job.title}
                company={job.company}
                batch={job.batch}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:bg-indigo-50 transition duration-300 border-l-4 border-indigo-500"
              />
            ))}
          </div>

          {/* Fixed Sidebar Ad */}
          <div className="hidden lg:flex lg:col-span-3 justify-center">
            <div className="sticky top-32 h-[600px] w-full">
              <AdCard
                size="large"
                className="h-full w-full rounded-xl shadow-lg bg-gradient-to-b from-green-400 to-teal-500 text-white"
              />
            </div>
          </div>
        </div>

        {/* Bottom Banner Ad */}
        <div className="my-10">
          <AdCard
            size="banner"
            className="rounded-xl shadow-lg bg-gradient-to-r from-pink-500 to-red-500 text-white"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
