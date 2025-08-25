import React, { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetJobById } from "../../store/jobSlice";
import JobList from "./JobList";
import AdCard from "../../templates/AdCard";
import conf from "../../conf/conf";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

function JobDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const moreJobsRef = useRef(null);

  const { jobs } = useSelector((state) => state.job);

  const whatsappLink = conf.whatsapp_url;
  const telegramLink = conf.telegram_url;

  useEffect(() => {
    const handleScroll = () => {
      if (moreJobsRef.current) {
        const yOffset = -128;
        const y =
          moreJobsRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    window.addEventListener("scrollToMoreJobs", handleScroll);
    return () => window.removeEventListener("scrollToMoreJobs", handleScroll);
  }, []);

  useEffect(() => {
    dispatch(GetJobById(id));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, id]);

  const currentJob = useMemo(() => {
    return jobs.find((job) => String(job.id) === String(id));
  }, [jobs, id]);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="fixed top-[64px] left-0 w-full z-40 bg-gray-50/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <AdCard
            size="banner"
            className="rounded-2xl shadow-md bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
          />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 pt-[230px] pb-20 flex gap-8">
        <div className="flex-1">
          <div className="p-8 sm:p-12 bg-gradient-to-r from-indigo-600 to-teal-500 rounded-3xl shadow-xl text-white">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-10">
              {currentJob ? currentJob.title : "No Jobs Found"}
            </h1>
            {currentJob?.company && (
              <p className="text-center mt-1 mb-8">
                <span className="text-xl sm:text-3xl font-semibold text-white-900 font-serif">
                  {currentJob.company}
                </span>
              </p>
            )}

            {currentJob ? (
              <div className="bg-white text-gray-800 rounded-3xl p-8 sm:p-10 shadow-lg text-left">
                {/* Job Details */}
                <div className="space-y-4">
                  {(currentJob.city || currentJob.country) && (
                    <p>
                      <span className="font-bold text-indigo-700">
                        Location:
                      </span>{" "}
                      {currentJob.city}{" "}
                      {currentJob.country && `, ${currentJob.country}`}
                    </p>
                  )}
                  {currentJob.salary && (
                    <p>
                      <span className="font-bold text-indigo-700">Salary:</span>{" "}
                      {currentJob.salary}
                    </p>
                  )}
                  {currentJob.workType && (
                    <p>
                      <span className="font-bold text-indigo-700">
                        Work Type:
                      </span>{" "}
                      {currentJob.workType}
                    </p>
                  )}
                  {currentJob.description && (
                    <p>
                      <span className="font-bold text-indigo-700">
                        Job Description:
                      </span>{" "}
                      {currentJob.description}
                    </p>
                  )}

                  {currentJob.experience && (
                    <p>
                      <span className="font-bold text-indigo-700">
                        Experience:
                      </span>{" "}
                      {currentJob.experience}
                    </p>
                  )}
                  <div className="my-8">
                    <AdCard
                      size="banner"
                      className="w-full h-40 rounded-2xl shadow-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center justify-center"
                    />
                  </div>
                  {currentJob.degree && (
                    <p>
                      <span className="font-bold text-indigo-700">
                        Qualifications:
                      </span>{" "}
                      {currentJob.degree}
                    </p>
                  )}
                  {currentJob.skills && (
                    <p>
                      <span className="font-bold text-indigo-700">
                        Skills Required:
                      </span>{" "}
                      {currentJob.skills}
                    </p>
                  )}
                  {currentJob.responsibilities && (
                    <p>
                      <span className="font-bold text-indigo-700">
                        Responsibilities:
                      </span>{" "}
                      {currentJob.responsibilities}
                    </p>
                  )}
                  {currentJob.companyDescription && (
                    <p>
                      <span className="font-bold text-indigo-700">
                        Company Overview:
                      </span>{" "}
                      {currentJob.companyDescription}
                    </p>
                  )}
                  {currentJob.batch && (
                    <p>
                      <span className="font-bold text-indigo-700">Batch:</span>{" "}
                      {currentJob.batch}
                    </p>
                  )}
                  {currentJob.applyURL && (
                    <div className="mt-12 text-center">
                      <a
                        href={currentJob.applyURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold px-10 py-4 rounded-2xl shadow-lg hover:scale-105 hover:opacity-95 transition"
                      >
                        Apply Now
                      </a>
                    </div>
                  )}
                </div>
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

          <div className="mt-12">
            <AdCard
              size="banner"
              className="rounded-2xl shadow-md bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
            />
          </div>
        </div>

        <div className="hidden lg:block w-80">
          <div className="sticky top-1/3">
            <AdCard
              size="medium"
              className="rounded-2xl shadow-md h-[500px] bg-gradient-to-r from-indigo-600 to-teal-500 text-white"
            />
          </div>
        </div>
      </div>

      <div ref={moreJobsRef} className="w-full py-16 px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="inline-block px-6 py-3 rounded-xl text-2xl font-bold text-white mb-8 bg-gradient-to-r from-red-600 to-pink-600 shadow">
            More Jobs
          </h2>

          <JobList
            jobs={jobs}
            excludeId={id}
            adFrequency={6}
            jobsPerPage={18}
          />
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
