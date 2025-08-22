import JobCard from "../templates/JobCard";
import AdCard from "../templates/AdCard";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetAllJobs } from "../store/jobSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 30;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const jobData = await dispatch(GetAllJobs());
      if (jobData.payload?.success) {
        setJobs(jobData.payload.data.jobs || []);
      }
    };
    fetchJobs();
  }, [dispatch]);

  // Pagination calculations
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 🔹 Fixed Top Ad (same as JobDetails) */}
      <div className="fixed top-[64px] left-0 w-full z-40 bg-gray-50/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <AdCard
            size="banner"
            className="rounded-2xl shadow-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
          />
        </div>
      </div>

      {/* Main Content with padding to avoid overlap */}
      <div className="max-w-7xl mx-auto px-6 pt-[230px]">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6">
          Latest Jobs
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Job Cards */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[minmax(0,1fr)]">
            {currentJobs.map((job, idx) => (
              <JobCard
                key={idx}
                title={job.title}
                company={job.company}
                batch={job.batch}
                buttonLabel="View Details"
                onClick={() => navigate(`/job/${job.id}`)}
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

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-indigo-700 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Bottom Banner Ad */}
        <div className="my-10">
          <AdCard
            size="banner"
            className="rounded-2xl shadow-lg bg-gradient-to-r from-pink-500 to-red-500 text-white"
          />
        </div>
      </div>
    </div>
  );
}


