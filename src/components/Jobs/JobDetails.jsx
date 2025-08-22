import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetAllJobs, GetJobById } from "../../store/jobSlice";
import { useDispatch } from "react-redux";
import AdCard from "../../templates/AdCard";
import JobCard from "../../templates/JobCard";
import conf from "../../conf/conf";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

function JobDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12;

  const whatsappLink = conf.whatsapp_url;
  const telegramLink = conf.telegram_url;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const result = await dispatch(GetJobById(id));
        if (result.payload?.success) {
          setJobData(result.payload.data.job || null);
        } else {
          setJobData(null);
        }
      } catch (e) {
        console.error("Error fetching details", e);
        setJobData(null);
      }
    };
    fetchJobDetails();
  }, [dispatch, id]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobData = await dispatch(GetAllJobs());
      if (jobData.payload?.success) {
        setJobs(jobData.payload.data.jobs || []);
      }
    };
    fetchJobs();
  }, [dispatch]);

  // 🔹 Scroll to top when job ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // 🔹 Filter out the current job from "More Jobs"
  const filteredJobs = jobs.filter((job) => job.id !== id);

  // 🔹 Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 🔹 Fixed Top Ad */}
      <div className="fixed top-[64px] left-0 w-full z-40 bg-gray-50/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <AdCard
            size="banner"
            className="rounded-2xl shadow-md bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
          />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 pt-[230px] pb-20 flex gap-8">
        {/* 🔹 Main Job Content */}
        <div className="flex-1">
          <div className="p-8 sm:p-12 bg-gradient-to-r from-indigo-600 to-teal-500 rounded-3xl shadow-xl text-white">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-10">
              {jobData ? jobData.title : "No Jobs Found"}
            </h1>

            {jobData ? (
              <div className="bg-white text-gray-800 rounded-3xl p-8 sm:p-10 shadow-lg text-left">
                {/* Job Details */}
                <div className="space-y-4">
                  {jobData.company && (
                    <p>
                      <span className="font-bold text-indigo-700">
                        Company:
                      </span>{" "}
                      {jobData.company}
                    </p>
                  )}
                  {(jobData.city || jobData.country) && (
                    <p>
                      <span className="font-bold text-indigo-700">
                        Location:
                      </span>{" "}
                      {jobData.city} {jobData.country && `, ${jobData.country}`}
                    </p>
                  )}
                  {jobData.salary && (
                    <p>
                      <span className="font-bold text-indigo-700">Salary:</span>{" "}
                      {jobData.salary}
                    </p>
                  )}
                  {jobData.workType && (
                    <p>
                      <span className="font-bold text-indigo-700">
                        Work Type:
                      </span>{" "}
                      {jobData.workType}
                    </p>
                  )}
                </div>

                {/* Inline Ad (mobile only) */}
                <div className="my-8 lg:hidden">
                  <AdCard
                    size="medium"
                    className="rounded-2xl shadow-md bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
                  />
                </div>

                {/* First Half */}
                <div className="mt-8 space-y-5 leading-relaxed text-lg">
                  {jobData.description && (
                    <p>
                      <span className="font-bold text-teal-600">
                        Job Description:
                      </span>{" "}
                      {jobData.description}
                    </p>
                  )}
                  {jobData.experience && (
                    <p>
                      <span className="font-bold text-teal-600">
                        Experience:
                      </span>{" "}
                      {jobData.experience}
                    </p>
                  )}
                  {jobData.degree && (
                    <p>
                      <span className="font-bold text-teal-600">
                        Qualification:
                      </span>{" "}
                      {jobData.degree}
                    </p>
                  )}
                </div>

                {/* Middle Ad (desktop only) */}
                <div className="hidden lg:block my-12">
                  <AdCard
                    size="banner"
                    className="rounded-2xl shadow-md h-56 bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
                  />
                </div>

                {/* Second Half */}
                <div className="mt-8 space-y-5 leading-relaxed text-lg">
                  {jobData.skills && (
                    <p>
                      <span className="font-bold text-teal-600">
                        Skills Required:
                      </span>{" "}
                      {jobData.skills}
                    </p>
                  )}
                  {jobData.responsibilities && (
                    <p>
                      <span className="font-bold text-teal-600">
                        Responsibilities:
                      </span>{" "}
                      {jobData.responsibilities}
                    </p>
                  )}
                  {jobData.companyDescription && (
                    <p>
                      <span className="font-bold text-teal-600">
                        Company Overview:
                      </span>{" "}
                      {jobData.companyDescription}
                    </p>
                  )}
                  {jobData.batch && (
                    <p>
                      <span className="font-bold text-teal-600">Batch:</span>{" "}
                      {jobData.batch}
                    </p>
                  )}
                </div>

                {/* Apply Button */}
                {jobData.applyURL && (
                  <div className="mt-12 text-center">
                    <a
                      href={jobData.applyURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold px-10 py-4 rounded-2xl shadow-lg hover:scale-105 hover:opacity-95 transition"
                    >
                      Apply Now
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white text-gray-800 rounded-3xl p-8 sm:p-10 shadow-lg text-center text-lg">
                <p className="mb-4">❌ This job no longer exists.</p>
                <p className="mb-6">Contact Admin for more details:</p>

                <div className="flex justify-center gap-6">
                  {whatsappLink && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-600 transition"
                    >
                      <FaWhatsapp className="text-xl" />
                      WhatsApp
                    </a>
                  )}
                  {telegramLink && (
                    <a
                      href={telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-blue-600 transition"
                    >
                      <FaTelegramPlane className="text-xl" />
                      Telegram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 🔹 Bottom Ad */}
          <div className="mt-12">
            <AdCard
              size="banner"
              className="rounded-2xl shadow-md bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
            />
          </div>
        </div>

        {/* 🔹 Floating Right-Side Ad */}
        <div className="hidden lg:block w-80">
          <div className="sticky top-1/3">
            <AdCard
              size="medium"
              className="rounded-2xl shadow-md h-[500px] bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Suggested Jobs with Pagination */}
      <div className="w-full py-16 px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          {/* Gradient only on title */}
          <h2 className="inline-block px-6 py-3 rounded-xl text-2xl font-bold text-white mb-8 bg-gradient-to-r from-red-600 to-pink-600 shadow">
            More Jobs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentJobs.map((job, idx) => (
              <React.Fragment key={idx}>
                <JobCard
                  title={job.title}
                  company={job.company}
                  batch={job.batch}
                  buttonLabel="View Details"
                  onClick={() => navigate(`/job/${job.id}`)}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:bg-red-50 transition duration-300 border-l-4 border-red-500"
                />

                {/* 🔹 Insert square ad after every 3 jobs (only on mobile) */}
                {(idx + 1) % 3 === 0 && (
                  <div className="block sm:hidden">
                    <AdCard
                      size="square"
                      className="rounded-xl shadow-md bg-gradient-to-r from-red-500 to-pink-500 text-white"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md bg-white text-blue-700 font-semibold disabled:opacity-50 shadow"
            >
              Prev
            </button>
            <span className="px-4 py-2 text-gray-700 font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md bg-white text-blue-700 font-semibold disabled:opacity-50 shadow"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
