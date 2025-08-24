import React, { useState } from "react";
import JobCard from "../../templates/JobCard";
import AdCard from "../../templates/AdCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function JobList({ excludeId = null, jobsPerPage = 90 }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Pull the filtered jobs directly from Redux
  const jobs = useSelector((state) => state.job.filteredJobs);
  const allJobs = useSelector((state) => state.job.jobs);
  const jobsToRender = jobs.length > 0 ? jobs : allJobs;

  // Filter out current job if excludeId is provided
  const filteredJobs = excludeId
    ? jobsToRender.filter((job) => job.id !== excludeId)
    : jobsToRender;

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  // Prepare job list with ads
  const jobsWithAd = [];
  currentJobs.forEach((job, idx) => {
    jobsWithAd.push(
      <JobCard
        key={job.id}
        title={job.title}
        company={job.company}
        batch={job.batch}
        buttonLabel="View Details"
        onClick={() => navigate(`/job/${job.id}`)}
      />
    );

    // Insert Ad after every 6 jobs
    if ((idx + 1) % 6 === 0) {
      jobsWithAd.push(
        <div key={`ad-${job.id}-${idx}`} className="col-span-1 w-full">
          <AdCard
            size="banner"
            className="w-full h-40 rounded-2xl shadow-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center justify-center"
          />
        </div>
      );
    }
  });

  return (
    <div>
      {/* ===== Jobs Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(0,1fr)]">
        {jobsWithAd}
      </div>

      {/* ===== Pagination Controls ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg shadow ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          >
            Previous
          </button>

          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg shadow ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* ===== Bottom Banner Ad Above Footer ===== */}
      <div className="mt-12">
        <AdCard
          size="banner"
          className="w-full h-40 rounded-2xl shadow-md bg-gradient-to-r from-indigo-600 to-teal-500 text-white flex items-center justify-center"
        />
      </div>
    </div>
  );
}
